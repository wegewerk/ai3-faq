<?php

return [
    'ai3_faq_generate' => [
        'path' => '/ai3/faq/generate',
        'target' => \Wegewerk\Ai3Faq\Controller\Ajax\ArticlefaqController::class . '::getFaq'
    ],
];
