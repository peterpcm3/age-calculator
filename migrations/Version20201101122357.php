<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201101122357 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        $this->addSql('CREATE TABLE search (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, date DATETIME NOT NULL, years INT DEFAULT NULL, days INT DEFAULT NULL, hours INT DEFAULT NULL, created_at DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE search ADD session_id VARCHAR(255) NOT NULL, CHANGE years years INT DEFAULT NULL, CHANGE days days INT DEFAULT NULL, CHANGE hours hours INT DEFAULT NULL, CHANGE created_at created_at DATETIME DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        $this->addSql('DROP TABLE search');
    }
}
