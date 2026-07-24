.. include:: /Includes.rst.txt

.. _editor:

======
Editor
======

This section describes how editors can use the **Page FAQ** content
element in the TYPO3 backend to generate AI-powered frequently asked
questions from page content.

.. _editor-add-element:

Add the Page FAQ element
=========================

#.  Open the **Page** module and navigate to the page where you want to
    add a FAQ section.
#.  Click :guilabel:`+ Content` to open the content element wizard.
#.  Select the **Page FAQ** element from the **AI3** group.
#.  The content element editor will open with the FAQ generator interface.

.. _editor-generate-faq:

Generate FAQ
============

#.  In the :guilabel:`FAQ generator` field, you'll see:
    
    * A language selector (currently supports Deutsch)
    * A :guilabel:`Generate FAQ` button

#.  Select the desired **language** from the dropdown menu.
#.  Click the :guilabel:`Generate FAQ` button.
#.  Wait while the FAQ is being generated
    (:guilabel:`Generating FAQ...` is shown during processing).
#.  The generated FAQ appears in a preview table with:
    
    * **Question** column showing the generated questions
    * **Answer** column showing the corresponding answers

.. _editor-review-and-save:

Review and save FAQ
====================

#.  Review the generated question-answer pairs in the preview table.
#.  If you're satisfied with the generated FAQ, click 
    :guilabel:`Use FAQ Elements`.
#.  The FAQ data is saved to the content element and the accordion
    configuration is automatically applied.
#.  **Save** the content element to store all changes.

.. tip::

   If you're not satisfied with the generated FAQ, you can click
   :guilabel:`Generate FAQ` again to create a new version. Each generation
   may produce different questions and answers based on the AI analysis.

.. _editor-accordion-settings:

Accordion configuration
=======================

After saving the FAQ data, you can configure the accordion presentation
using the standard Bootstrap Package accordion settings:

#.  Navigate to the :guilabel:`Accordion` tab in the content element
#.  Configure accordion behavior options:
    
    * **Flush** - Remove borders for seamless appearance
    * **Always open** - Keep all accordion items expanded
    * **Behavior** - Single or multiple items can be open

#.  Each FAQ question becomes an accordion header, with the answer as content.

.. _editor-frontend:

Frontend output
===============

Once saved, the Page FAQ content element renders as a Bootstrap accordion
on the frontend with the following features:

*   **Interactive accordion** - Users can click questions to expand/collapse answers
*   **SEO-optimized markup** - Includes schema.org FAQPage structured data
*   **Responsive design** - Works seamlessly on all device sizes
*   **Accessible** - Follows WCAG guidelines for keyboard navigation and screen readers

.. _editor-best-practices:

Best practices
==============

Content preparation
```````````````````

*   Ensure all relevant content is saved on the page before generating FAQ
*   Use descriptive headings and well-structured content for better FAQ generation
*   Remove or minimize irrelevant content that might confuse the AI analysis

FAQ placement
`````````````

*   Place FAQ sections near the end of the page after main content
*   Consider using FAQ on landing pages, product pages, and service descriptions
*   Use clear section headings to separate FAQ from other content

Review and editing
``````````````````

*   Always review generated FAQ for accuracy and relevance
*   Edit questions and answers if they need clarification
*   Remove duplicate or off-topic questions from the accordion items
*   Ensure answers are comprehensive but concise

.. note::

   The FAQ is generated from all content elements currently saved on
   the page. Make sure all relevant content is saved and published
   before generating the FAQ for the most comprehensive results.