CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE job_level AS ENUM (
    'INTERN',
    'JUNIOR',
    'MIDDLE',
    'SENIOR',
    'LEAD',
    'CTO'
    );
CREATE TYPE job_scope AS ENUM (
    'BACKEND',
    'FRONTEND',
    'FULLSTACK',
    'ANDROID',
    'IOS',
    'DEVOPS',
    'QA',
    'SECURITY',
    'DS',
    'DESIGNER'
    );
CREATE TABLE jobs
(
    id               UUID PRIMARY KEY NOT NULL,
    verified         BOOLEAN          NOT NULL,
    premium          BOOLEAN          NOT NULL,
    contact_email    TEXT             NOT NULL,
    contact_phone    TEXT             NOT NULL,
    contact_telegram TEXT             NOT NULL,
    location_country TEXT             NOT NULL,
    location_city    TEXT             NOT NULL,
    salary_min       DECIMAL          NOT NULL,
    salary_max       DECIMAL          NOT NULL,
    level            job_level        NOT NULL,
    scope            job_scope        NOT NULL,
    stack            TEXT ARRAY       NOT NULL,
    remote           BOOLEAN          NOT NULL,
    description      TEXT             NOT NULL
);
CREATE INDEX ON jobs USING btree (description text_pattern_ops);