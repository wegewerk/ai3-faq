.. include:: /Includes.rst.txt

.. _configuration:

=============
Configuration
=============

.. _configuration-ai3-core:

Ai3 Core Dependency
====================

Ai3 FAQ relies on the configuration of **Ai3 Core**. Ensure that
:composer:`wegewerk/ai3_core` is properly installed and configured with
valid API credentials for the ZAK-AI service.

.. _configuration-api-credentials:

API Credentials
===============

The API credentials for the ZAK-AI service are provided via environment
variables consumed by ``Wegewerk\Ai3Core\Api\ZakAiClient``:

*   ``ZAKAI_API_KEY`` -- your ZAK-AI API key.
*   ``ZAKAI_SECRET`` -- your ZAK-AI secret.

Set these environment variables in your system or in your ``.env`` file:

.. code-block:: bash
   :caption: Environment variables

   export ZAKAI_API_KEY=your-api-key-here
   export ZAKAI_SECRET=your-secret-here

.. _configuration-bootstrap-package:

Bootstrap Package Integration
=============================

The extension requires :composer:`bk2k/bootstrap-package` for accordion
functionality. The FAQ content element uses the Bootstrap Package accordion
configuration and FlexForm settings.

The accordion configuration is automatically applied via TCA:

.. code-block:: php
   :caption: TCA configuration for accordion

   \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPiFlexFormValue(
       '*',
       'FILE:EXT:bootstrap_package/Configuration/FlexForms/Accordion.xml',
       'ai3_faq'
   );

.. _configuration-schema-markup:

Schema.org Configuration
========================

The extension uses :composer:`brotkrueml/schema` to generate structured
data markup for FAQ pages. This improves SEO and enables rich snippets
in search results.

The schema markup is automatically generated when the FAQ is rendered
on the frontend, using the ``FAQPage`` schema type.

.. _configuration-typoscript:

TypoScript
==========

The extension automatically loads its TypoScript configuration. The setup
includes:

.. code-block:: typoscript
   :caption: TypoScript configuration

   # Content element registration
   tt_content.ai3_faq < lib.contentElement
   tt_content.ai3_faq {
       templateName = Accordion
       # Uses Bootstrap Package accordion template
   }

.. _configuration-ajax-routes:

Backend AJAX Routes
===================

The extension registers AJAX routes for backend communication:

.. code-block:: php
   :caption: Backend/AjaxRoutes.php

   return [
       'ai3_faq_generate' => [
           'path' => '/ai3/faq/generate',
           'target' => \Wegewerk\Ai3Faq\Controller\Ajax\ArticlefaqController::class . '::getFaq'
       ],
   ];

.. _configuration-languages:

Language Support
================

The extension currently supports German (``de``) language output from the
ZAK-AI API. Additional languages can be configured by modifying the
language options in the JavaScript module:

.. code-block:: javascript
   :caption: Language configuration in faq.js

   getLanguageOptions() {
        return [
            {
                value: 'de',
                label: 'Deutsch'
            }
            // Add more languages here
        ]
   }

.. _configuration-customization:

Customization Options
=====================

Accordion Styling
`````````````````

The FAQ accordion inherits styling from Bootstrap Package. You can customize
the appearance by overriding Bootstrap variables or CSS classes:

.. code-block:: css
   :caption: Custom accordion styling

   .accordion-item {
       /* Custom FAQ accordion styling */
   }

Template Override
`````````````````

To customize the FAQ output template, override the Accordion template
from Bootstrap Package in your site package:

.. code-block:: text
   :caption: Template path

   EXT:your_sitepackage/Resources/Private/Templates/ContentElements/Accordion.html

Field Configuration
```````````````````

The extension adds custom TCA fields that can be configured:

.. code-block:: php
   :caption: Custom TCA fields

   'tx_ai3_faq_generator' => [
       'exclude' => true,
       'label'   => 'LLL:EXT:ai3_faq/Resources/Private/Language/locallang.xlf:tx_ai3.faq.generator',
       'config'  => [
           'type'       => 'user',
           'renderType' => 'ai3FaqGeneratorElement',
       ],
   ]