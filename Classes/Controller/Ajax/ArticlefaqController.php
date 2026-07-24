<?php

declare(strict_types=1);

namespace Wegewerk\Ai3Faq\Controller\Ajax;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Log\LoggerInterface;
use TYPO3\CMS\Backend\Attribute\AsController;
use TYPO3\CMS\Core\Http\Response;
use TYPO3\CMS\Core\Resource\StorageRepository;
use Wegewerk\Ai3Core\Domain\Repository\PagesRepository;
use Wegewerk\Ai3Faq\Domain\Capabilities\ArticlefaqCapability;
use Wegewerk\Ai3Core\Controller\Ajax\AbstractAjaxController;

#[AsController]
class ArticlefaqController extends AbstractAjaxController
{
    public function __construct(
        LoggerInterface                  $logger,
        private readonly PagesRepository $pagesRepository,
        private ArticlefaqCapability $articlefaqCapability,
        protected StorageRepository      $storageRepository
    ) {
        parent::__construct($logger);
    }


    public function getFaq(ServerRequestInterface $request): ResponseInterface {
        try {
            $parsedBody = $request->getParsedBody();
            $pageId = (int)($parsedBody['page_id'] ?? 0);

            if ($pageId <= 0) {
                return $this->createJsonErrorResponse(new Response(), [ 'error' => 'Invalid page ID' ]);
            }
            $content = $this->pagesRepository->getPageContent($pageId);

            if (empty($content)) {
                return $this->createJsonErrorResponse(new Response(), [ 'error' => 'No content found on page' ]);
            }

            $faq = $this->articlefaqCapability->endpoint->generate(
                '',
                $content,
                $parsedBody['language'] ?? 'de');
            if ($faq === null) {
                return $this->createJsonErrorResponse(new Response(), [ 'error' => 'Error: Suggestion was empty for Page ' . $pageId ]);
            }
            if (is_string($faq)) {
                $faq = json_decode($faq, true, 512, JSON_THROW_ON_ERROR);
            }

            return $this->createJsonSuccessResponse(new Response(), [
                'faqData' => $faq,
                'source' => $content,
                'type' => 'faq'
            ]);
        } catch (\Exception $e) {
            $this->logger->error('Error generating Faq: ' . $e->getMessage());
            return $this->createJsonErrorResponse(new Response(), [ 'error' => $e->getMessage() ]);
        }
    }

}
