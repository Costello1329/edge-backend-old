INSERT INTO jobs (id, verified, premium, contact_email, contact_phone, contact_telegram, location_country,
                  location_city, company_name, company_industry, company_website, salary_min, salary_max, level, spec,
                  stack, remote, description)
VALUES (uuid_generate_v4(),
        TRUE,
        FALSE,
        'test@mail.ru',
        '+7-999-544-12-32',
        '@chebyrash',
        'RUSSIA',
        'MOSCOW',
        'SBERBANK',
        'FINANCES',
        'sberbank.ru',
        50000,
        75000,
        'CTO',
        'BACKEND',
        '{Java, Docker}',
        TRUE,
        'Lorem ipsum dolor sit amet'),
       (uuid_generate_v4(),
        TRUE,
        TRUE,
        'test@mail.ru',
        '+7-999-123-12-32',
        '@chebyrash',
        'RUSSIA',
        'MOSCOW',
        'YANDEX',
        'IT',
        'yandex.ru',
        150000,
        175000,
        'JUNIOR',
        'FULLSTACK',
        '{JS, Typescript, React}',
        FALSE,
        'Lorem ipsum dolor sit amet');