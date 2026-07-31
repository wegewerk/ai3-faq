<?php

declare(strict_types=1);

namespace Wegewerk\Ai3Faq\FormEngine;

use TYPO3\CMS\Backend\Form\Element\AbstractFormElement;
use TYPO3\CMS\Core\Page\JavaScriptModuleInstruction;

class Ai3FaqGeneratorElement extends AbstractFormElement
{
    public function render(): array
    {
        $result = $this->initializeResultArray();
        $result['javaScriptModules'][] = JavaScriptModuleInstruction::create('@wegewerk/Ai3Faq/faq.js');
        $result['javaScriptModules'][] = JavaScriptModuleInstruction::create('@wegewerk/ai3core/creditsElement.js');

        $html = [
            '<div data-ai3="ai3-faq-container"',
            ' data-page-id="' . (int)$this->data['parentPageRow']['uid'] . '"',
            ' data-record-uid="' . $this->data['databaseRow']['uid'] . '"',
            '>',
            '  <ai3-credits></ai3-credits>',
            '  <div data-ai3="ai3-faq-app">',
            '  </div>',
            '</div>'
        ];

        $result['html'] = implode('', $html);
        return $result;
    }
}
