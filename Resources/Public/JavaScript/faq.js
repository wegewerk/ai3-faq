import {lll} from "@typo3/core/lit-helper.js";
import {html, render} from 'lit-html';
import Ai3Api from './ai3api.js';
import Notification from "@typo3/backend/notification.js";
import FormEngine from "@typo3/backend/form-engine.js";
import "@wegewerk/ai3core/creditsElement.js";

class FaqApp {
    constructor(container) {
        this.container = container;
        this.pageId = container.dataset.pageId;
        this.recordUid = container.dataset.recordUid;
        this.api = new Ai3Api();
        this.loading = false;
        this.saving = false;
        this.creditCost = null;
        this.language = this.getLanguageOptions()[0].value;
        this.min = '3';
        this.max = '7';
        this.keyword = '';
        this.previewData = [];
        this.ai3Type = '';
        this.ai3Source = '';
        this.ai3FaqData = '';
        this.responses = [];
        this.selectedIndex = -1;
        this.replaceAll = true;
    }

    init() {
        this.render();
        this.fetchCreditCost();
    }

    async fetchCreditCost() {
        try {
            const costs = await this.api.creditCosts();
            this.creditCost = costs?.faq ?? null;
        } catch {
            this.creditCost = null;
        }
        this.render();
    }

    async generateFaq(previous = null) {
        this.loading = true;
        this.render();

        try {
            const options = {
                keyword: this.keyword,
                language: this.language,
                min: this.min,
                max: this.max
            };
            if (previous) {
                options.previous = JSON.stringify(previous);
            }
            const response = await this.api.generateFaq(this.pageId, this.recordUid, options);
            const result = await response.resolve();
            const data = JSON.parse(result);

            if (data.success && data.faqData) {
                const responseItem = {
                    type: data.type,
                    source: data.source,
                    faqData: data.faqData,
                };
                this.responses.push(responseItem);
                this.selectResponse(this.responses.length - 1);
            } else {
                Notification.error( lll('tx_ai3.faq.error', data.error || 'Unknown error'));
            }
        } catch (error) {
            let message= await error.response.json();
            Notification.error(lll('tx_ai3.faq.error', message.error));
        } finally {
            this.loading = false;
            this.render();
        }
    }

    selectResponse(index) {
        if (index >= 0 && index < this.responses.length) {
            this.selectedIndex = index;
            const selected = this.responses[index];
            this.ai3Type = selected.type;
            this.ai3Source = selected.source;
            this.ai3FaqData = selected.faqData;
            this.previewFaq(selected.faqData);
        }
    }

    /**
     * preview the generated FAQ Data
     *
     *
     */
    previewFaq(generatedFAQ) {
        this.previewData = generatedFAQ;
        this.render();
    }

    async useFaq() {
        this.saving=true;
        this.render();
        this.updateAi3Fields(this.ai3Type, this.ai3Source, JSON.stringify({replace: this.replaceAll, faqitems: this.ai3FaqData}));
        FormEngine.saveDocument();
    }
    updateAi3Fields(type, source,faqData) {
        // Helper to set a field value and dispatch the change event.
        const setField = (fieldName, value) => {
            const selector = `[data-formengine-input-name="data[tt_content][${this.recordUid}][${fieldName}]"]`;
            const field = document.querySelector(selector);
            if (!field) {
                console.warn('AI3 field not found:', selector);
                return false;
            }
            field.value = value;
            // Trigger change event for TYPO3 to recognize the change
            field.dispatchEvent(new Event('change', { bubbles: true }));
            return true;
        };

        setField('tx_ai3_type', type);
        setField('tx_ai3_source', source);
        setField('tx_ai3_raw', faqData);
    }

    render() {
        const languageOptions = this.getLanguageOptions();
        const numfaqOptions = this.getNumfaqOptions();
        const template = html`
            <div class="form-inline">
                <div class="row">
                    <div class="col">
                        ${lll('tx_ai3.faq.keyword')}:
                        <input type="text" class="form-control form-control-clearable t3js-clearable"
                               @change="${(e) => this.keyword = e.target.value}"></input>
                    </div>

                    <div class="col">
                            ${lll('tx_ai3.faq.language')}: <select class="form-select" @change="${(e) => this.language = e.target.value}">
                            ${languageOptions.map(option => html`
                            <option value="${option.value}" ?selected="${this.language == option.value}">${option.label}</option>
                        `)}
                        </select>
                    </div>
                    <div class="col">
                        ${lll('tx_ai3.faq.min')}: <select class="form-select" @change="${(e) => this.min = e.target.value}">
                        ${numfaqOptions.map(option => html`
                            <option value="${option.value}" ?selected="${this.min == option.value}">${option.label}</option>
                        `)}
                    </select>
                    </div>
                    <div class="col">
                        ${lll('tx_ai3.faq.max')}: <select class="form-select" @change="${(e) => this.max = e.target.value}">
                        ${numfaqOptions.map(option => html`
                            <option value="${option.value}" ?selected="${this.max == option.value}">${option.label}</option>
                        `)}
                    </select>
                    </div>
                </div>
            </div>
            <div class="preview mt-3">
                ${this.previewData.length > 0 ? html`
                    ${this.responses.length >= 1 ? html`
                        <div class="mb-3 d-flex align-items-center flex-wrap gap-2">
                            <span class="fw-bold me-2">${lll('tx_ai3.faq.select_response')}:</span>
                            <div class="btn-group" role="group">
                                ${this.responses.map((resp, index) => html`
                                    <button
                                        type="button"
                                        class="btn btn-sm ${this.selectedIndex === index ? 'btn-primary' : 'btn-default'}"
                                        @click="${() => this.selectResponse(index)}"
                                    >
                                        ${lll('tx_ai3.faq.response', index + 1)}
                                    </button>
                                `)}
                            </div>
                            <button
                                    type="button"
                                    class="btn btn-default btn-sm ms-2"
                                    @click="${() => this.generateFaq(this.ai3FaqData || this.previewData)}"
                                    ?disabled="${this.loading || this.saving}"
                            >
                                <typo3-backend-icon identifier="ai3-faq-icon" size="small"></typo3-backend-icon>
                                ${this.loading ? lll('tx_ai3.faq.generating') : lll('tx_ai3.faq.button_generate_another')}
                                ${this.creditCost !== null ? ` (${lll('tx_ai3.faq.cost', this.creditCost)})` : ''}
                            </button>${this.loading ? html`<typo3-backend-spinner size="small"></typo3-backend-spinner>` : ''}<ai3-credits></ai3-credits>
                        </div>
                    ` : ''}
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>${lll('tx_ai3.faq.question')}</th>
                                <th>${lll('tx_ai3.faq.answer')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.previewData.map(faq => html`
                                <tr>
                                    <td>${faq.question}</td>
                                    <td>${faq.answer}</td>
                                </tr>
                            `)}
                        </tbody>
                    </table>
                    <div class="row" role="group">
                        <button
                                type="button"
                                class="btn btn-default col"
                                @click="${() => this.useFaq()}"
                                ?disabled="${this.saving || this.loading}"
                        >
                            ${lll('tx_ai3.faq.use')}
                        </button>
                        <div class="form-check form-switch col">
                            <input type="checkbox" class="form-check-input" value="1" role="switch"
                                   checked="checked" @change="${(e) => this.replaceAll = e.target.checked}">
                            <label class="form-check-label" for="formengine-check-toggle-6a9ade0735d05882188728-0">
                                ${lll('tx_ai3.faq.replaceAll')}
                            </label>
                        </div>
                    </div>
                ` : html`
                        <button
                                type="button"
                                class="btn btn-default"
                                @click="${() => this.generateFaq()}"
                                ?disabled="${this.loading}"
                        >
                            <typo3-backend-icon identifier="ai3-faq-icon" size="small"></typo3-backend-icon>
                            ${this.loading ? lll('tx_ai3.faq.generating') : lll('tx_ai3.faq.button_generate')}
                            ${this.creditCost !== null ? ` (${lll('tx_ai3.faq.cost', this.creditCost)})` : ''}
                        </button>${this.loading ? html`<typo3-backend-spinner size="small"></typo3-backend-spinner>` : ''}<ai3-credits></ai3-credits>
                    `}
            </div>
        `;
        render(template, this.container.querySelector('[data-ai3="ai3-faq-app"]'));
    }
    getNumfaqOptions() {
        return [
            {
                value: '3',
                label: '3'
            },
            {
                value: '5',
                label: '5'
            },
            {
                value: '7',
                label: '7'
            }
        ]
    }

    getLanguageOptions() {
        return [
            {
                value: 'de',
                label: 'Deutsch'
            },
            {
                value: 'en',
                label: 'English'
            }
        ]
    }

    getSelectedLanguage() {
        const selector = `[name="data[tt_content][${this.recordUid}][sys_language_uid]"]`;
        const field = document.querySelector(selector);
        if (!field) {
            return this.getLanguageOptions()[0].value;
        } else  {
            return field.value;
        }

    }

}

document.querySelectorAll('[data-ai3="ai3-faq-container"]').forEach(container => {
    const app = new FaqApp(container);
    app.init();
});
