<?php

namespace Wegewerk\Ai3Faq\Api;

use Wegewerk\Ai3Core\Api\AbstractZakAiEndpoint;

/**
 * Implements the API Endpoint related to FAQ generation
 */
class ZakAiFaqDummy extends AbstractZakAiEndpoint
{
    protected string $endpoint = 'faq';
    protected string $responseKey = 'faq';
    protected array $requiredOptions = [ 'text' ];
    protected array $optionalOptions = [ 'min', 'max', 'previous', 'keyword', 'language' ];

    public function generate(array $options = []): string
    {
        $min = isset($options['min']) && (int)$options['min'] > 0 ? (int)$options['min'] : 3;
        $max = isset($options['max']) && (int)$options['max'] > 0 ? (int)$options['max'] : 7;
        if ($min > $max) {
            $max = $min;
        }

        $count = rand($min, $max);
        $timestamp = time();

        $items = [];
        for ($i = 1; $i <= $count; $i++) {
            $items[] = [
                'question' => 'Dummy] question ' . $i,
                'answer' => 'answer (' . $timestamp . ') [Dummy',
            ];
        }
        sleep(1);

        return json_encode($items, JSON_THROW_ON_ERROR);
    }
}
