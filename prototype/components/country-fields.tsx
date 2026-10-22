"use client";

import { getCountries, getCountryCallingCode, type CountryCode } from "libphonenumber-js";

const displayNames = typeof Intl !== "undefined" && Intl.DisplayNames
  ? new Intl.DisplayNames(["en"], { type: "region" })
  : null;

export const countryOptions = getCountries()
  .map((code) => ({
    code,
    name: displayNames?.of(code) || code,
    callingCode: getCountryCallingCode(code),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export function CountrySelect({
  value,
  onChange,
  required = true,
  placeholder = "Select country",
}: {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <select className="field-control" value={value} onChange={(e) => onChange(e.target.value)} required={required}>
      <option value="">{placeholder}</option>
      {countryOptions.map((country) => (
        <option key={country.code} value={country.code}>{country.name}</option>
      ))}
    </select>
  );
}

export function PhoneField({
  country,
  onCountryChange,
  number,
  onNumberChange,
}: {
  country: CountryCode | "";
  onCountryChange: (country: CountryCode) => void;
  number: string;
  onNumberChange: (number: string) => void;
}) {
  const selected = country ? countryOptions.find((item) => item.code === country) : null;

  return (
    <div className="phone-field">
      <select
        className="field-control phone-country"
        value={country}
        onChange={(e) => onCountryChange(e.target.value as CountryCode)}
        required
        aria-label="Phone country"
      >
        <option value="">Country</option>
        {countryOptions.map((item) => (
          <option key={item.code} value={item.code}>
            {item.code} +{item.callingCode}
          </option>
        ))}
      </select>
      <div className="phone-number-wrap">
        <span className="phone-prefix">{selected ? `+${selected.callingCode}` : "+"}</span>
        <input
          className="field-control phone-number"
          required
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="Phone number"
          value={number}
          onChange={(e) => onNumberChange(e.target.value.replace(/[^0-9 ()-]/g, ""))}
        />
      </div>
    </div>
  );
}

export function countryName(code: string | null | undefined) {
  if (!code) return "";
  return displayNames?.of(code) || code;
}

export function fullPhone(country: CountryCode | "", number: string) {
  if (!country || !number.trim()) return "";
  return `+${getCountryCallingCode(country)} ${number.trim()}`;
}
