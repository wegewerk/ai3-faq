<?php

namespace Wegewerk\Ai3Faq\Api;

use Wegewerk\Ai3Core\Api\AbstractZakAiEndpoint;

/**
 * Implements the API Endpoint related to FAQ generation
 */
class ZakAiFaq extends AbstractZakAiEndpoint
{
    protected string $endpoint = 'faq';
    protected string $responseKey = 'faq';
    protected array $requiredOptions = [ 'text' ];
    protected array $optionalOptions = [ 'min', 'max', 'previous', 'keyword', 'language' ];
}
