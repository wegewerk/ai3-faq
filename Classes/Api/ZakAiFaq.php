<?php

namespace Wegewerk\Ai3Faq\Api;

use Wegewerk\Ai3Core\Api\ZakAiClient;
use Wegewerk\Ai3Core\Api\ZakAiEndpointInterface;

/**
 * Implemets the API Endpoint related to page summary generation
 */
class ZakAiFaq implements ZakAiEndpointInterface
{
    public function __construct(private ZakAiClient $client) {}

    public function generate(string $imagePath, string $description, string $language): string
    {
        $body = $this->client->postJson(
            'faq',
            [
                'text'     => $description,
                'language' => $language ?? 'de',
            ]
        );

        $faq = $body['faq'] ?? $body['bulletpoints'] ?? [];
        return $faq;
    }

}
