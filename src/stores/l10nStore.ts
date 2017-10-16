import { action, observable } from 'mobx'

import { getL10NDictionary, L10N, Language } from '../l10n'

export class L10NStore {
    @observable dictionary: L10N = getL10NDictionary()

    @action
    changeLanguage = (language: Language) => {
        this.dictionary = getL10NDictionary(language)
    }
}

const l10nStore = new L10NStore()

export default l10nStore
