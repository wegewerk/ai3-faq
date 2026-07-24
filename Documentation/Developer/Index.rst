.. include:: /Includes.rst.txt

.. _developer:

=========
Developer
=========

.. _developer-architecture:

Architecture
============

Ai3 FAQ follows the *Ai3 Suite* capability pattern provided by
:composer:`wegewerk/ai3_core`:

*   A **Capability** class registers the feature under a unique key.
*   An **Endpoint** class implements the ZAK-AI API call.
*   A **FormEngine element** renders the backend widget.
*   A **backend AJAX controller** handles the generation request.
*   **Bootstrap Package integration** provides accordion functionality.

.. _developer-php-api:

PHP API
=======

.. _developer-articlefaq-capability:

ArticlefaqCapability
--------------------

.. php:class:: Wegewerk\Ai3Faq\Domain\Capabilities\ArticlefaqCapability

   Extends ``Wegewerk\Ai3Core\Domain\Capabilities\Capability``. Registered
   via ``Configuration/Services.yaml`` with the following wiring:

   *   ``$key``: ``articlefaq``
   *   ``$title``: ``Article FAQ``
   *   ``$endpoint``: ``ZakAiFaq``
   *   Tagged as ``ai3.capability``

.. _developer-zakai-faq:

ZakAiFaq
--------

.. php:class:: Wegewerk\Ai3Faq\Api\ZakAiFaq

   Implements ``Wegewerk\Ai3Core\Api\ZakAiEndpointInterface``. Wraps
   ``ZakAiClient`` to call the ZAK-AI ``faq`` REST endpoint.

   .. php:method:: generate($imagePath, $description, $language)

      Sends page content to the ZAK-AI API and returns the generated
      FAQ data as a JSON string containing question-answer pairs.

      :param string $imagePath: Unused; reserved for future use.
      :param string $description: The page content text to analyze for FAQ generation.
      :param string $language: The target language for the FAQ (default: 'de').
      :returntype: string

      The response contains an array of objects with ``question`` and ``answer`` properties.

.. _developer-ajax-controller:

ArticlefaqController
--------------------

.. php:class:: Wegewerk\Ai3Faq\Controller\Ajax\ArticlefaqController

   Backend AJAX controller (``#[AsController]``), extends
   ``Wegewerk\Ai3Core\Controller\Ajax\AbstractAjaxController``.

   .. php:method:: getFaq(ServerRequestInterface $request)

      Handles the AJAX FAQ generation request.

      #.  Reads ``page_id`` and ``language`` from the POST body.
      #.  Fetches all page content via ``PagesRepository::getPageContent()``.
      #.  Calls ``ArticlefaqCapability`` endpoint to generate the FAQ.
      #.  Parses the JSON response to extract question-answer pairs.
      #.  Returns a JSON response with ``faqData``, ``source``, and
          ``type: 'faq'`` on success, or an error JSON on failure.

      :returntype: ResponseInterface

.. _developer-form-engine:

FormEngine integration
======================

The custom FormEngine node ``ai3FaqGeneratorElement`` is registered in
TCA configuration:

.. code-block:: php
   :caption: TCA configuration for the generator element

   $GLOBALS['TCA']['tt_content']['columns']['tx_ai3_faq_generator'] = [
       'exclude' => true,
       'label'   => 'LLL:EXT:ai3_faq/Resources/Private/Language/locallang.xlf:tx_ai3.faq.generator',
       'config'  => [
           'type'       => 'user',
           'renderType' => 'ai3FaqGeneratorElement',
       ],
   ];

.. php:class:: Wegewerk\Ai3Faq\FormEngine\Ai3FaqGeneratorElement

   Extends ``TYPO3\CMS\Backend\Form\Element\AbstractFormElement``. Renders
   a ``<div data-ai3="ai3-faq-container">`` with ``data-page-id`` and
   ``data-record-uid`` attributes. The Lit-HTML ``FaqApp`` mounts into
   the inner ``<div data-ai3="ai3-faq-app">``.

.. _developer-tca-configuration:

TCA Configuration
=================

Content element registration
----------------------------

The ``ai3_faq`` content type is registered in ``Configuration/TCA/Overrides/tt_content_faq.php``:

.. code-block:: php
   :caption: Content element registration

   ExtensionManagementUtility::addTcaSelectItem('tt_content',
       'CType',
       [
           'label'       => 'LLL:EXT:ai3_faq/Resources/Private/Language/locallang.xlf:tx_ai3.faq.label_ctype',
           'value'       => 'ai3_faq',
           'icon'        => 'ai3-faq-icon',
           'description' => 'LLL:EXT:ai3_faq/Resources/Private/Language/locallang.xlf:tx_ai3.faq.label_description',
           'group'       => 'AI3',
       ],
       'textmedia',
       'after',
   );

Bootstrap Package integration
-----------------------------

The FAQ element inherits accordion functionality from Bootstrap Package:

.. code-block:: php
   :caption: Accordion configuration

   $GLOBALS['TCA']['tt_content']['types']['ai3_faq'] = $GLOBALS['TCA']['tt_content']['types']['accordion'];

   \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPiFlexFormValue(
       '*',
       'FILE:EXT:bootstrap_package/Configuration/FlexForms/Accordion.xml',
       'ai3_faq'
   );

.. _developer-ajax-route:

AJAX route
==========

The backend AJAX route is registered in
``Configuration/Backend/AjaxRoutes.php``:

.. list-table::
   :header-rows: 1
   :widths: 20 20 60

   *   - Route name
       - Path
       - Handler
   *   - ``ai3_faq_generate``
       - ``/ai3/faq/generate``
       - ``ArticlefaqController::getFaq``

**Request** (POST, JSON body):

.. code-block:: json
   :caption: AJAX request body

   {
       "page_id": 42,
       "language": "de"
   }

**Response** (success):

.. code-block:: json
   :caption: AJAX success response

   {
       "success": true,
       "faqData": [
           {
               "question": "What is this page about?",
               "answer": "This page describes..."
           },
           {
               "question": "How do I use this feature?",
               "answer": "To use this feature, you need to..."
           }
       ],
       "source": "Page content extracted from...",
       "type": "faq"
   }

**Response** (error):

.. code-block:: json
   :caption: AJAX error response

   {
       "success": false,
       "error": "Error message describing what went wrong"
   }

.. _developer-javascript:

JavaScript modules
==================

JavaScript modules are registered via ``Configuration/JavaScriptModules.php``
under the ``@wegewerk/Ai3Faq/`` import map prefix.

*   **``@wegewerk/Ai3Faq/ai3api.js``** -- ``Ai3Api`` class with
    ``generateFaq(pageId, recordUid, language)`` that POSTs to the AJAX route
    via TYPO3's ``AjaxRequest``.
*   **``@wegewerk/Ai3Faq/faq.js``** -- Lit-HTML ``FaqApp`` that
    renders the backend widget, handles button clicks, calls ``Ai3Api``,
    displays FAQ preview, and manages the accordion data.

FaqApp Class
------------

.. js:class:: FaqApp

   The main JavaScript class that handles the FAQ generation interface.

   .. js:method:: generateFaq()

      Initiates FAQ generation by calling the backend AJAX endpoint.
      Shows loading state and handles success/error responses.

   .. js:method:: previewFaq(generatedFAQ)

      Displays the generated FAQ in a preview table with questions and answers.

   .. js:method:: useFaq()

      Saves the generated FAQ data to the content element fields and triggers
      form submission via ``FormEngine.saveDocument()``.

   .. js:method:: updateAi3Fields(type, source, faqData)

      Updates the hidden AI3 core fields with the generated FAQ data:
      
      * ``tx_ai3_type`` - Set to 'faq'
      * ``tx_ai3_source`` - Contains the original page content
      * ``tx_ai3_raw`` - Contains the JSON-encoded FAQ data

.. _developer-services-configuration:

Services Configuration
======================

The extension's services are configured in ``Configuration/Services.yaml``:

.. code-block:: yaml
   :caption: Services.yaml

   services:
     _defaults:
       autowire: true
       autoconfigure: true
       public: false

     Wegewerk\Ai3Faq\:
       resource: '../Classes/*'

     Wegewerk\Ai3Faq\Domain\Capabilities\ArticlefaqCapability:
       arguments:
         $key: 'articlefaq'
         $title: 'Article FAQ'
         $endpoint: '@Wegewerk\Ai3Faq\Api\ZakAiFaq'
       tags:
         - { name: 'ai3.capability' }

.. _developer-event-listener:

Event listener
==============

.. php:class:: Wegewerk\Ai3Faq\EventListener\AfterFormEnginePageInitializedEventListener

   Listens to ``AfterFormEnginePageInitializedEvent`` (``#[AsEventListener]``).
   Adds the extension's ``locallang.xlf`` as an inline language label file
   to the ``PageRenderer``, making all translation keys available to
   JavaScript.

.. _developer-schema-integration:

Schema.org Integration
======================

The extension automatically generates schema.org markup for FAQ pages when
using the :composer:`brotkrueml/schema` extension. This provides structured
data for search engines and enables rich snippets.

The schema markup uses the ``FAQPage`` type and includes:

*   Main entity as ``FAQPage``
*   Individual ``Question`` entities for each FAQ item
*   Proper ``acceptedAnswer`` markup for each answer

.. _developer-customization:

Customization and Extension
===========================

Adding Language Support
------------------------

To add support for additional languages, modify the ``getLanguageOptions()``
method in ``faq.js``:

.. code-block:: javascript
   :caption: Adding language support

   getLanguageOptions() {
        return [
            {
                value: 'de',
                label: 'Deutsch'
            },
            {
                value: 'en',
                label: 'English'
            },
            {
                value: 'fr',
                label: 'Français'
            }
        ];
   }

Custom FAQ Processing
---------------------

To customize FAQ processing, extend the ``ZakAiFaq`` class:

.. code-block:: php
   :caption: Custom FAQ endpoint

   class CustomZakAiFaq extends ZakAiFaq
   {
       public function generate(string $imagePath, string $description, string $language): string
       {
           $result = parent::generate($imagePath, $description, $language);
           
           // Custom processing of FAQ data
           $faqData = json_decode($result, true);
           $processedData = $this->customProcessing($faqData);
           
           return json_encode($processedData);
       }

       private function customProcessing(array $faqData): array
       {
           // Your custom logic here
           return $faqData;
       }
   }

Template Customization
-----------------------

Override the Bootstrap Package accordion template to customize FAQ output:

.. code-block:: html
   :caption: Custom accordion template

   <!-- EXT:your_sitepackage/Resources/Private/Templates/ContentElements/Accordion.html -->
   <div class="accordion faq-accordion" id="accordion_{data.uid}">
       <f:for each="{accordionItems}" as="item" iteration="iteration">
           <div class="accordion-item">
               <h2 class="accordion-header">
                   <button class="accordion-button faq-question" type="button"
                           data-bs-toggle="collapse"
                           data-bs-target="#collapse_{data.uid}_{iteration.cycle}">
                       {item.question}
                   </button>
               </h2>
               <div id="collapse_{data.uid}_{iteration.cycle}" 
                    class="accordion-collapse collapse">
                   <div class="accordion-body faq-answer">
                       <f:format.html>{item.answer}</f:format.html>
                   </div>
               </div>
           </div>
       </f:for>
   </div>