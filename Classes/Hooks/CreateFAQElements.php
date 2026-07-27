<?php

namespace Wegewerk\Ai3Faq\Hooks;

use Symfony\Component\DependencyInjection\Attribute\Autoconfigure;
use TYPO3\CMS\Core\Database\Connection;
use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\DataHandling\DataHandler;
use TYPO3\CMS\Core\Utility\StringUtility;

#[Autoconfigure(public:true)]
class CreateFAQElements
{
    public function __construct(
        private readonly ConnectionPool $connectionPool
    ) {}

    public function processCmdmap_afterFinish(DataHandler $dataHandler) {
        if(array_key_exists('tt_content',$dataHandler->datamap)) {
            foreach ($dataHandler->datamap['tt_content'] as $key => $record) {
                $recordUid = $dataHandler->substNEWwithIDs[$key] ?? $key;
                $recordPid = $this->getPid('tt_content', $recordUid);
                if($record['tx_ai3_type'] ?? null === 'faq' && $record['tx_ai3_raw'] ?? null !== '') {
                    $faqdata = json_decode($record['tx_ai3_raw'], true);
                    if (is_array($faqdata)) {
                        $datamap = [];
                        foreach ($faqdata as $item) {
                            if (isset($item['question'], $item['answer'])) {
                                $fieldArray = [
                                    'pid' => $recordPid,
                                    'tt_content' => $recordUid,
                                    'header' => $item['question'],
                                    'bodytext' => $item['answer'],
                                ];
                                if (isset($record['sys_language_uid'])) {
                                    $fieldArray['sys_language_uid'] = $record['sys_language_uid'];
                                }
                                if (isset($record['l10n_parent'])) {
                                    $fieldArray['l10n_parent'] = $record['l10n_parent'];
                                }
                                // create new accordion item
                                $datamap['tx_bootstrappackage_accordion_item'][StringUtility::getUniqueId('NEW')] = $fieldArray;
                            }
                        }
                        // Clear the tx_ai3_raw field to avoid recreating the elements on every save
                        $datamap['tt_content'][$recordUid] = ['tx_ai3_raw' => ''];
                        $dataHandler->start($datamap,[]);
                        $dataHandler->process_datamap();
                    }
                }
            }
        }
    }

    public function getPID($table, $uid)
    {
        $queryBuilder = $this->connectionPool->getQueryBuilderForTable($table);
        $queryBuilder->getRestrictions()->removeAll();
        $queryBuilder->select('pid')
            ->from($table)
            ->where($queryBuilder->expr()->eq('uid', $queryBuilder->createNamedParameter($uid, Connection::PARAM_INT)));
        if ($row = $queryBuilder->executeQuery()->fetchAssociative()) {
            return $row['pid'];
        }
        return false;
    }
}
