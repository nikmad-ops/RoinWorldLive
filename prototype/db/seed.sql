DELETE FROM projects;

INSERT INTO projects
(id, slug, name, asset_class, location, status, total_value_aed, target_raise_aed, funded_percent, min_investment_aed, target_return_min, target_return_max, duration_years, risk_level, sponsor_investment_aed, summary, metric_label, metric_value)
VALUES
('prj_logistics', 'dubai-logistics', 'Dubai Logistics Company', 'Logistics', 'Dubai, UAE', 'open', 48000000, 16000000, 64, 50000, 12, 15, 4, 'moderate', 18000000, 'Expansion of an operating logistics business and its tracked commercial fleet.', 'Fleet utilisation', '87%'),
('prj_residential', 'residential-development', 'Residential Development', 'Residential', 'Dubai, UAE', 'almost_full', 210000000, 55000000, 91, 100000, 14, 18, 3, 'moderate', 70000000, 'Residential development with live construction progress and verified project reporting.', 'Pre-sales', '42%'),
('prj_hospital', 'hospital-development', 'Hospital Development', 'Healthcare', 'UAE', 'waitlist', 320000000, 80000000, 100, 150000, 11, 14, 7, 'elevated', 95000000, 'Construction, commissioning and long-term operation of a healthcare facility.', 'Design completion', '76%'),
('prj_datacenter', 'data-center', 'Data Center', 'Digital Infrastructure', 'Dubai, UAE', 'coming_soon', 450000000, 120000000, 0, 250000, 13, 17, 6, 'moderate', 140000000, 'Development and operation of a scalable data-center asset with live infrastructure milestones.', 'Planned capacity', '12 MW');
