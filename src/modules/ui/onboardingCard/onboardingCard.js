import { LightningElement } from 'lwc';
import Toast from 'lightning/toast';

// Resolve against Vite's base URL so the image loads under any deploy subpath
// (e.g. GitHub Pages serves the app from /<repo>/ rather than the domain root).
const HERO_IMAGE = `${import.meta.env.BASE_URL}images/onboarding-hero.png`;

// Each step is one page in the wizard. The progress indicator and the question
// content are both driven from this list.
const STEPS = [
    {
        value: 'skills',
        label: 'Skills',
        question: 'What kind of agent skills do you want?',
        options: [
            { label: 'Design Intelligence', value: 'design-intelligence', count: 12 },
            { label: 'Operational', value: 'operational', count: 4 },
            { label: 'Product Management', value: 'product-management', count: 22 },
            { label: 'UI Technology', value: 'ui-technology', count: 11 },
            { label: 'Data Processing', value: 'data-processing', count: 9 },
            { label: 'Agent Building', value: 'agent-building', count: 17 },
        ],
    },
    {
        value: 'channels',
        label: 'Channels',
        question: 'Where should your agent show up?',
        options: [
            { label: 'Web Chat', value: 'web-chat', count: 8 },
            { label: 'Email', value: 'email', count: 5 },
            { label: 'Slack', value: 'slack', count: 14 },
            { label: 'Mobile App', value: 'mobile-app', count: 7 },
            { label: 'Voice', value: 'voice', count: 3 },
            { label: 'SMS', value: 'sms', count: 6 },
        ],
    },
];

// Steps shown in the progress indicator. The first two map to real content
// pages (STEPS); the rest are display-only placeholders for the full journey.
const INDICATOR_STEPS = [
    { value: 'skills', label: 'Skills' },
    { value: 'channels', label: 'Channels' },
    { value: 'tone', label: 'Tone' },
    { value: 'review', label: 'Review' },
];

export default class OnboardingCard extends LightningElement {
    heroImage = HERO_IMAGE;
    heroTitle = 'Personal call with Shelby';
    heroButtonLabel = 'Schedule a Meeting';

    _stepIndex = 0;
    // Track selections per step so each page keeps its own checked state.
    _selectedByStep = STEPS.map(() => new Set());

    get steps() {
        return INDICATOR_STEPS;
    }

    get currentStep() {
        return STEPS[this._stepIndex].value;
    }

    get question() {
        return STEPS[this._stepIndex].question;
    }

    get options() {
        const selected = this._selectedByStep[this._stepIndex];
        return STEPS[this._stepIndex].options.map((option) => ({
            ...option,
            checked: selected.has(option.value),
        }));
    }

    get isLastStep() {
        return this._stepIndex === STEPS.length - 1;
    }

    get nextButtonLabel() {
        return this.isLastStep ? 'Finish' : 'Next Question';
    }

    handleSkillChange(event) {
        const value = event.target.dataset.value;
        const selected = this._selectedByStep[this._stepIndex];
        if (event.target.checked) {
            selected.add(value);
        } else {
            selected.delete(value);
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
        if (this.isLastStep) {
            Toast.show({
                label: 'All done',
                message: 'Your agent preferences have been saved.',
                variant: 'success',
                mode: 'dismissible',
            });
            return;
        }
        this._stepIndex += 1;
    }
}
