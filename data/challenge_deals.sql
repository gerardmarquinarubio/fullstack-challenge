CREATE TABLE deals (
    id INT NOT NULL AUTO_INCREMENT,
    date DATETIME,
    funding_amount DOUBLE,
    funding_round TEXT,
    company_id INT,
    PRIMARY KEY (id)
);

ALTER TABLE deals ADD FOREIGN KEY (company_id) REFERENCES companies(company_id);