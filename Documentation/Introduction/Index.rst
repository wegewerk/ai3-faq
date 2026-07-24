.. include:: /Includes.rst.txt

.. _introduction:

============
Introduction
============

Ai3 FAQ enhanced the accordion elemtn provided by the bootstrap package.
Ai3_faq add a 'generate' button to it that generates
frequently asked questions and answers based on the page content via the ZAK-AI REST API.

.. _introduction-features:

Features
========

*   **AI-generated FAQ** -- sends all page content to the ZAK-AI
    ``faq`` endpoint and returns structured question-answer pairs.
*   **Accordion presentation** -- the generated FAQ is displayed using
    Bootstrap accordion component.
*   **Preview functionality** -- editors can preview the generated FAQ
    before saving it to the content element.
*   **Schema.org markup** -- includes structured data markup for FAQ pages
    to improve SEO.
*   **Part of the Ai3 Suite** -- integrates with :composer:`wegewerk/ai3_core`
    for API client and capability infrastructure.

.. _introduction-how-it-works:

How it works
============

#.  An editor adds the **Page FAQ** content element (``CType: ai3_faq``)
    to a page.
#.  The custom FormEngine widget displays a language selector and a
    **"Generate FAQ"** button.
#.  On click, a backend AJAX request fetches all content records on the
    current page and sends them to the ZAK-AI ``faq`` API.
#.  The API response contains question-answer pairs that are displayed
    in a preview table.
#.  The editor can review the generated FAQ and click **"Use FAQ Elements"**
    to save the data to the content element.
#.  On the frontend, the element renders the FAQ as a Bootstrap accordion
    with proper schema.org markup for SEO benefits.

.. _introduction-use-cases:

Use cases
=========

*   **SEO optimization** -- generate schema.org compliant FAQ markup
    to enhance search engine visibility and rich snippets.
