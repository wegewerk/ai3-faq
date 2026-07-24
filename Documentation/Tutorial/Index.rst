.. include:: /Includes.rst.txt

.. _tutorial:

========
Tutorial
========

This tutorial will guide you through using the Ai3 FAQ extension to create
AI-powered FAQ sections for your TYPO3 website.

.. _tutorial-scenario:

Scenario
========

Imagine you have a product page with detailed information about a software
tool, including features, pricing, system requirements, and support options.
You want to create a FAQ section that addresses common visitor questions
automatically based on this content.

.. _tutorial-preparation:

Step 1: Prepare your page content
==================================

Before generating the FAQ, ensure your page has comprehensive content:

#. Create or edit a page in the TYPO3 backend
#. Add content elements with detailed information:
   
   * **Header element** - Page title and introduction
   * **Text elements** - Detailed descriptions of features, benefits, processes
   * **Text & Media elements** - Product images with descriptions  
   * **Additional content** - Any other relevant information

#. Make sure all content is saved and published

.. tip::

   The AI analyzes all visible content on the page, so the more comprehensive
   and well-structured your content, the better the generated FAQ will be.

.. _tutorial-add-faq:

Step 2: Add the Page FAQ element
=================================

#. In the Page module, navigate to your content page
#. Click :guilabel:`+ Content` to add a new content element
#. In the content element wizard, look for the **AI3** group
#. Select **Page FAQ** from the available elements
#. Click :guilabel:`Next` or :guilabel:`Save`

The content element editor opens with the FAQ generator interface.

.. _tutorial-generate:

Step 3: Generate your FAQ
==========================

#. In the FAQ generator section, you'll see:
   
   * A language dropdown (currently supports Deutsch)
   * A :guilabel:`Generate FAQ` button

#. Select your preferred language (Deutsch)
#. Click :guilabel:`Generate FAQ`
#. Wait for the generation process (usually 10-30 seconds)

The system will:

* Extract all content from the current page
* Send it to the ZAK-AI service
* Receive question-answer pairs
* Display them in a preview table

.. _tutorial-review:

Step 4: Review the generated FAQ
=================================

Once generation is complete, you'll see a preview table with:

* **Question column** - AI-generated questions about your content
* **Answer column** - Corresponding answers based on page content

Example output might include:

.. list-table:: Sample Generated FAQ
   :header-rows: 1
   :widths: 40 60

   * - Question
     - Answer
   * - Was kostet das Produkt?
     - Das Produkt ist in drei Preispaketen verfügbar: Basic (29€/Monat), Professional (59€/Monat) und Enterprise (149€/Monat).
   * - Welche Systemanforderungen gibt es?
     - Das System benötigt mindestens PHP 8.1, MySQL 8.0 und 2GB RAM. Unterstützte Betriebssysteme sind Linux, Windows und macOS.
   * - Gibt es eine kostenlose Testversion?
     - Ja, alle Pakete können 14 Tage kostenlos getestet werden ohne Verpflichtungen.

.. _tutorial-customize:

Step 5: Save and customize
==========================

#. If you're satisfied with the generated FAQ, click :guilabel:`Use FAQ Elements`
#. The FAQ data is saved to the content element
#. Click :guilabel:`Save` to store the content element
#. Navigate to the **Accordion** tab to customize the presentation:
   
   * **Flush** - Remove borders for seamless appearance
   * **Always open** - Keep all items expanded by default
   * **Behavior** - Allow single or multiple open items

.. _tutorial-frontend:

Step 6: View the result
=======================

Navigate to your page on the frontend to see the FAQ in action:

* Questions appear as clickable accordion headers
* Clicking a question expands the answer
* The interface is responsive and accessible
* Schema.org markup is automatically included for SEO

.. _tutorial-seo-benefits:

SEO Benefits
============

The generated FAQ automatically includes schema.org markup:

.. code-block:: json
   :caption: Generated Schema.org markup

   {
     "@context": "https://schema.org",
     "@type": "FAQPage",
     "mainEntity": [
       {
         "@type": "Question",
         "name": "Was kostet das Produkt?",
         "acceptedAnswer": {
           "@type": "Answer",
           "text": "Das Produkt ist in drei Preispaketen verfügbar..."
         }
       }
     ]
   }

This markup enables:

* **Rich snippets** in Google search results
* **FAQ rich results** with expandable questions
* **Improved click-through rates** from search engines
* **Enhanced local SEO** for location-based questions

.. _tutorial-tips:

Tips for better results
=======================

Content structure
`````````````````

* Use clear headings (H2, H3) to organize content
* Write comprehensive descriptions, not just bullet points
* Include specific details like prices, dates, requirements
* Avoid overly technical jargon in content meant for general audiences

FAQ optimization
````````````````

* Review generated questions for clarity and relevance
* Edit answers to be more concise if needed
* Remove duplicate or off-topic questions
* Consider the user intent behind each question

Frontend presentation
`````````````````````

* Place FAQ sections near the end of pages
* Use clear section headings to separate FAQ from other content
* Consider adding a table of contents for long FAQ sections
* Test the accordion functionality on mobile devices

.. _tutorial-troubleshooting:

Troubleshooting
===============

FAQ generation fails
`````````````````````

* **Check API credentials**: Ensure ZAK-AI credentials are properly configured
* **Verify page content**: Make sure the page has sufficient content to analyze
* **Check network connectivity**: Ensure the server can reach the ZAK-AI API
* **Review error messages**: Check the browser console for detailed error information

Poor quality questions
``````````````````````

* **Improve content structure**: Use clearer headings and better organization
* **Add more detail**: Provide more comprehensive descriptions and explanations
* **Remove irrelevant content**: Hide or remove content not relevant to FAQ generation
* **Try regenerating**: Click "Generate FAQ" again for different results

Accordion not working
`````````````````````

* **Check Bootstrap Package**: Ensure Bootstrap Package is installed and configured
* **Verify JavaScript**: Check browser console for JavaScript errors
* **Test responsive design**: Ensure accordion works on different screen sizes
* **Check template overrides**: Verify any custom templates are correctly implemented

.. _tutorial-next-steps:

Next Steps
==========

Once you're comfortable with basic FAQ generation, consider:

* **Customizing templates** - Override the accordion template for custom styling
* **Adding multiple languages** - Configure additional language options
* **Integrating with analytics** - Track FAQ interaction and user engagement
* **Creating FAQ collections** - Use FAQ on multiple related pages for comprehensive coverage

For advanced customization and development, see the :ref:`Developer Documentation <developer>`.