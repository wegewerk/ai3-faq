.. include:: /Includes.rst.txt

.. _installation:

============
Installation
============

.. _installation-requirements:

Requirements
============

*   TYPO3 CMS **13.4** or **14.x**
*   :composer:`wegewerk/ai3_core` (installed automatically as a dependency)
*   :composer:`typo3/cms-fluid-styled-content` **13.4** or **14.x**
*   :composer:`bk2k/bootstrap-package` (for accordion functionality)
*   :composer:`brotkrueml/schema` **4.x** (for schema.org markup)
*   A valid **ZAK-AI API key** (see :ref:`configuration`)

.. _installation-composer:

Installation via Composer
=========================

Ai3 FAQ is installed exclusively via Composer. Run the following command
in your TYPO3 project root:

.. code-block:: bash
   :caption: Install the extension

   composer require wegewerk/ai3_faq

This will automatically install all required dependencies, including
:composer:`wegewerk/ai3_core`, :composer:`bk2k/bootstrap-package`,
and :composer:`brotkrueml/schema`.

.. _installation-activate:

Activate the extension
======================

After installation, activate the extension using the TYPO3 CLI:

.. code-block:: bash
   :caption: Activate via CLI

   vendor/bin/typo3 extension:activate ai3_faq

.. tip::

   The extension will automatically register the new **Page FAQ** content
   element type and make it available in the "AI3" group when creating
   new content elements.

.. _installation-verification:

Verify installation
===================

To verify the installation was successful:

#. Log in to the TYPO3 backend
#. Navigate to any page
#. Create a new content element
#. Look for the **Page FAQ** element in the "AI3" group
#. The element should be available with an AI3 FAQ icon
