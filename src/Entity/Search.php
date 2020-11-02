<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="search")
 * @ORM\HasLifecycleCallbacks
 * @ORM\Entity(repositoryClass="App\Repository\SearchRepository")
 */
class Search
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(name="name", type="string", length=255, nullable=false)
     */
    private $name;

    /**
     * @ORM\Column(name="date", type="datetime", nullable=false)
     */
    private $date;

    /**
     * @ORM\Column(name="years", type="integer", nullable=true)
     */
    private $years;

    /**
     * @ORM\Column(name="days", type="integer", nullable=true)
     */
    private $days;

    /**
     * @ORM\Column(name="hours", type="integer", nullable=true)
     */
    private $hours;

    /**
     * @ORM\Column(name="session_id", type="string", length=255, nullable=false)
     */
    private $sessionId;

    /**
     * @var datetime $createdAt
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=true)
     */
    private $createdAt;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getSessionId(): ?string
    {
        return $this->sessionId;
    }

    public function setSessionId(string $sessionId): self
    {
        $this->sessionId = $sessionId;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getYears(): ?int
    {
        return $this->years;
    }

    public function setYears(?int $years): self
    {
        $this->years = $years;

        return $this;
    }

    public function getDays(): ?int
    {
        return $this->days;
    }

    public function setDays(?int $days): self
    {
        $this->days = $days;

        return $this;
    }

    public function getHours(): ?int
    {
        return $this->hours;
    }

    public function setHours(?int $hours): self
    {
        $this->hours = $hours;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(?\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Update on insert
     *
     * @ORM\PrePersist
     */
    public function onPrePersist()
    {
        $this->createdAt = new \DateTime("now");
    }

    public function __toString()
    {
        return $this->name;
    }
}