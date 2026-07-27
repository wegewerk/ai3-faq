<?php

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;
use Wegewerk\Ai3Faq\Hooks\CreateFAQElements;

defined('TYPO3') or die();

$GLOBALS['TYPO3_CONF_VARS']['SYS']['formEngine']['nodeRegistry'][1780057002] = [
    'nodeName' => 'ai3FaqGeneratorElement',
    'priority' => 40,
    'class' => \Wegewerk\Ai3Faq\FormEngine\Ai3FaqGeneratorElement::class
];

$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_tcemain.php']['processCmdmapClass'][] = CreateFAQElements::class;
ExtensionManagementUtility::addTypoScriptSetup('

tt_content.ai3_faq =< tt_content.accordion
tt_content.ai3_faq {
    templateRootPaths.1784806551593 = EXT:ai3_faq/Resources/Private/Templates/ContentElements/
    templateName = Ai3Faq
}

');
