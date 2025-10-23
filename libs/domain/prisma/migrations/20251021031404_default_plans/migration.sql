-- Free Plan
INSERT INTO "plan" (
plan_id, external_id, name, description, "default", highlight, status, deleted_at, created_at, updated_at
) VALUES (
gen_random_uuid(),
'FREE_PLAN',
'Free',
'Perfect for individuals or small teams getting started.',
true,
false,
'ACTIVE',
NULL,
NOW(),
NOW()
);

-- Pro Plan
INSERT INTO "plan" (
plan_id, external_id, name, description, "default", highlight, status, deleted_at, created_at, updated_at
) VALUES (
gen_random_uuid(),
'PRO_PLAN',
'Pro',
'Ideal for growing teams that need more flexibility and features.',
false,
true,
'ACTIVE',
NULL,
NOW(),
NOW()
);

-- Enterprise Plan
INSERT INTO "plan" (
plan_id, external_id, name, description, "default", highlight, status, deleted_at, created_at, updated_at
) VALUES (
gen_random_uuid(),
'ENTERPRISE_PLAN',
'Enterprise',
'Best for large organizations requiring advanced scalability and support.',
false,
true,
'ACTIVE',
NULL,
NOW(),
NOW()
);

-- Plan Intervals
INSERT INTO "plan_interval" (
plan_interval_id, plan_id, external_id, amount, interval, interval_count, trial_days, status, deleted_at, created_at, updated_at
) VALUES
(gen_random_uuid(), (SELECT plan_id FROM plan WHERE external_id = 'FREE_PLAN'), 'FREE_MONTHLY', 0, 'MONTH', 1, 7, 'ACTIVE', NULL, NOW(), NOW()),
(gen_random_uuid(), (SELECT plan_id FROM plan WHERE external_id = 'PRO_PLAN'), 'PRO_MONTHLY', 49.90, 'MONTH', 1, 7, 'ACTIVE', NULL, NOW(), NOW()),
(gen_random_uuid(), (SELECT plan_id FROM plan WHERE external_id = 'ENTERPRISE_PLAN'), 'ENTERPRISE_YEARLY', 499.90, 'YEAR', 1, 14, 'ACTIVE', NULL, NOW(), NOW());

-- Plan Features
INSERT INTO "plan_feature" (
plan_feature_id, plan_id, feature, description, props, created_at, updated_at
) VALUES
(gen_random_uuid(), (SELECT plan_id FROM plan WHERE external_id = 'FREE_PLAN'), 'ORGANIZATION_COUNT', 'Allows up to 1 organization.', '{"maxOrganizations": 1}', NOW(), NOW()),
(gen_random_uuid(), (SELECT plan_id FROM plan WHERE external_id = 'PRO_PLAN'), 'ORGANIZATION_COUNT', 'Allows up to 5 organizations.', '{"maxOrganizations": 5}', NOW(), NOW()),
(gen_random_uuid(), (SELECT plan_id FROM plan WHERE external_id = 'ENTERPRISE_PLAN'), 'ORGANIZATION_COUNT', 'Allows unlimited organizations.', '{"maxOrganizations": 9999}', NOW(), NOW());
