<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

$key = 'ai3_faq';

ExtensionManagementUtility::addTcaSelectItem('tt_content',
    'CType',
    [
        'label'       => 'LLL:EXT:ai3_faq/Resources/Private/Language/locallang.xlf:tx_ai3.faq.label_ctype',
        'value'       => $key,
        'icon'        => 'ai3-faq-icon',
        'description' => 'LLL:EXT:ai3_faq/Resources/Private/Language/locallang.xlf:tx_ai3.faq.label_description',
        'group'       => 'AI3',
    ],
    'textmedia',
    'after');


$GLOBALS['TCA']['tt_content']['columns']['tx_ai3_faq_generator'] = [
    'exclude' => true,
    'label'   => 'LLL:EXT:ai3_faq/Resources/Private/Language/locallang.xlf:tx_ai3.faq.generator',
    'config'  => [
        'type'       => 'none',
        'renderType' => 'ai3FaqGeneratorElement',
    ],
];
$GLOBALS['TCA']['tt_content']['types'][$key] = $GLOBALS['TCA']['tt_content']['types']['accordion'];
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addToAllTCAtypes('tt_content', 'tx_ai3_faq_generator', $key, 'before:tx_bootstrappackage_accordion_item');
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addToAllTCAtypes('tt_content', 'tx_ai3_faq_payload', $key, 'after:tx_bootstrappackage_accordion_item');
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addToAllTCAtypes('tt_content', '--div--;LLL:EXT:ai3_core/Resources/Private/Language/locallang_db.xlf:tab.ai3,
        tx_ai3_type,
        tx_ai3_source,tx_ai3_raw
', $key);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPiFlexFormValue(
    '*',
    'FILE:EXT:bootstrap_package/Configuration/FlexForms/Accordion.xml',
    $key
);
