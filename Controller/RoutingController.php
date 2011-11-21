<?php

namespace RtxLabs\JsRoutingBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class RoutingController extends Controller
{
    /**
     * @Route("/routes/routes.js")
     */
    public function loadAction()
    {
        $content = "var __routes = ".json_encode($this->getRoutes());
        return new \Symfony\Component\HttpFoundation\Response($content, 200, array('content-type'=>'text/javascript'));
    }

    protected function getRoutes()
    {
        $routes = new \stdClass();
        $router = $this->container->get('router');
        foreach ($router->getRouteCollection()->all() as $name => $route) {
            $routes->$name =  $route->getPattern();
        }

        return $routes;
    }
}
