<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace App\Controller;

use App\Entity\Comment;
use App\Entity\Post;
use App\Events;
use App\Form\CommentType;
use App\Repository\PostRepository;
use App\Repository\SearchRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Cache;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\EventDispatcher\GenericEvent;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Controller used to manage blog contents in the public part of the site.
 *
 * @Route("/age-calculator")
 */
class AppController extends AbstractController
{
    /**
     * @Route("/", methods={"GET"}, name="age-calculator")
     */
    public function calculatorShow(): Response
    {
        return $this->render('calculator/calculator_show.html.twig', ['searchHistory' => []]);
    }

    /**
     * @Route("/save", methods={"POST"}, name="save-search")
     */
    public function save(Request $request, SearchRepository $searchRepo): Response
    {
        $requestData = $request->getContent();
        $requestData = json_decode($requestData, true);

        if (!isset($requestData['search'])) {
            throw new \Exception('Invalid request data');
        }

        $searchRepo->save($requestData['search']);

        return new Response(json_encode(['message' => 'Success']));
    }

    /**
     * @Route("/fetch", methods={"POST"}, name="fetch-search")
     */
    public function fetch(Request $request, SearchRepository $searchRepo): Response
    {
        $requestData = $request->getContent();
        $requestData = json_decode($requestData, true);

        if (!isset($requestData['sessionId'])) {
            throw new \Exception('Invalid request data');
        }

        $searches = $searchRepo->findBySessionId($requestData['sessionId']);

        return new Response(json_encode(['searches' => $searches]));
    }
}
