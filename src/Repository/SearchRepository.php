<?php

namespace App\Repository;

use App\Entity\Search;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Search|null find($id, $lockMode = null, $lockVersion = null)
 * @method Search|null findOneBy(array $criteria, array $orderBy = null)
 * @method Search[]    findAll()
 * @method Search[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SearchRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Search::class);
    }

    /**
     * @return Search[] Returns an array of Search objects
     */
    public function findBySessionId(string $sessionId)
    {
        $searches = $this->createQueryBuilder('s')
            ->andWhere('s.sessionId = :sessionId')
            ->setParameter('sessionId', $sessionId)
            ->orderBy('s.id', 'DESC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult();

        $transformedData = [];
        foreach ($searches as $search) {
            $transformedData[] = [
                'name'  => $search->getName(),
                'bDate' => $search->getDate()->format('d/m/Y H:m'),
                'years' => $search->getYears(),
                'days'  => $search->getDays(),
                'hours' => $search->getHours()
            ];
        }

        return array_values($transformedData);
    }

    public function save(array $searchRequest): Search
    {
        $em = $this->getEntityManager();

        $bDate = new \DateTime();
        $bDate->setTimestamp(strtotime($searchRequest['bDate']));

        $search = new Search();
        $search->setName($searchRequest['name']);
        $search->setDate($bDate);
        $search->setYears($searchRequest['years']);
        $search->setDays($searchRequest['days']);
        $search->setHours($searchRequest['hours']);
        $search->setSessionId($searchRequest['sessionId']);

        $em->persist($search);
        $em->flush();

        return $search;
    }
}
