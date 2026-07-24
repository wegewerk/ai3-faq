# Ai3 FAQ

**Ai3 FAQ** (`ai3_faq`) is the FAQ generation capability of the *Ai3 Suite*.
It provides an assistant to create FAQ content elements based on the content of a TYPO3 Page.

## Features

- **AI-Generated FAQ**: Automatically generate frequently asked questions and answers based on page content.
- **Accordion Interface**: Present FAQ as an interactive Bootstrap accordion component.
- **Multi-language Support**: Works across different languages supported by your TYPO3 installation and AI3 Suite.
- **Schema.org Markup**: Includes structured data for SEO and rich snippets.
- **Bootstrap Package Integration**: Uses Bootstrap Package accordion functionality and styling.

## Requirements

| Dependency | Version |
|---|---|
| TYPO3 CMS | `^13.4.0 \| ^14.0` |
| `wegewerk/ai3_core` | `@dev` |
| `bk2k/bootstrap-package` | `*` |
| `brotkrueml/schema` | `^4` |

## Installation

```bash
composer require wegewerk/ai3_faq
```

`wegewerk/ai3_core`, `bk2k/bootstrap-package`, and other dependencies are pulled in automatically as Composer dependencies.

## Quick start

1. Set the ZAK-AI credentials as environment variables:

   ```bash
   export ZAKAI_API_KEY=<your-api-key>
   export ZAKAI_SECRET=<your-secret>
   ```

2. Create a new content element and select **Page FAQ** from the **AI3** group

3. Click **Generate FAQ** to create question-answer pairs from page content

4. Review the generated FAQ and click **Use FAQ Elements** to save

## Configuration

This Extension does not provide any configuration settings. Configure the ZAK-AI credentials via environment variables.
See ai3_core documentation for API setup details.

The extension automatically integrates with Bootstrap Package for accordion functionality and brotkrueml/schema for SEO markup.

## Usage

### For Editors

1. Add the **Page FAQ** content element to any page
2. Use the FAQ generator to create questions and answers from page content
3. Configure accordion behavior using Bootstrap Package settings
4. Preview the FAQ accordion on the frontend

### For Developers

The extension follows the Ai3 Suite architecture:

- `ArticlefaqCapability` - Registers the FAQ capability
- `ZakAiFaq` - Implements the ZAK-AI FAQ endpoint
- `Ai3FaqGeneratorElement` - Custom FormEngine element for the backend interface
- `ArticlefaqController` - AJAX controller for FAQ generation

See the [Developer Documentation](Documentation/Developer/Index.rst) for detailed technical information.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).