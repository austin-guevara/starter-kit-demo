import { LightningElement } from 'lwc';
import Toast from 'lightning/toast';

// Resolve against Vite's base URL so the image loads under any deploy subpath
// (e.g. GitHub Pages serves the app from /<repo>/ rather than the domain root).
const HERO_IMAGE = `${import.meta.env.BASE_URL}images/onboarding-hero.png`;

const SKILLS = [
    { label: 'Design Intelligence', value: 'design-intelligence', count: 12 },
    { label: 'Operational', value: 'operational', count: 4 },
    { label: 'Product Management', value: 'product-management', count: 22 },
    { label: 'UI Technology', value: 'ui-technology', count: 11 },
    { label: 'Data Processing', value: 'data-processing', count: 9 },
    { label: 'Agent Building', value: 'agent-building', count: 17 },
];

export default class OnboardingCard extends LightningElement {
    heroImage = HERO_IMAGE;
    heroTitle = 'Personal call with Shelby';
    heroButtonLabel = 'Schedule a Meeting';
    question = 'What kind of agent skills do you want?';
    currentStep = 'skills';

    steps = [
        { label: 'Skills', value: 'skills' },
        { label: 'Channels', value: 'channels' },
        { label: 'Tone', value: 'tone' },
        { label: 'Review', value: 'review' },
    ];

    _selected = new Set();

    get skills() {
        return SKILLS.map((skill) => ({
            ...skill,
            checked: this._selected.has(skill.value),
        }));
    }

    handleSkillChange(event) {
        const value = event.target.dataset.value;
        if (event.target.checked) {
            this._selected.add(value);
        } else {
            this._selected.delete(value);
        }
    }

    handleScheduleMeeting() {
        Toast.show({
            label: 'Schedule a Meeting',
            message: 'A scheduling flow would open here.',
            variant: 'info',
            mode: 'dismissible',
        });
    }

    handleNextQuestion() {
        const count = this._selected.size;
        Toast.show({
            label: 'Next Question',
            message: count
                ? `${count} skill${count === 1 ? '' : 's'} selected.`
                : 'Select at least one skill to continue.',
            variant: count ? 'success' : 'warning',
            mode: 'dismissible',
        });
    }
}
