// GitHub Foundations Exam Simulator & Practice Bank - Application Logic
import { QUESTION_BANK, DOMAINS } from './questions.js';
import { GIT_COMMANDS, GITHUB_CLI_COMMANDS, REPOSITORY_FILES } from './studyData.js';
import { THEORY_MODULES } from './theoryData.js';
import { VirtualTerminal } from './terminalEngine.js';
import { LAB_LESSONS } from './labLessons.js';

// Application State
const state = {
  currentScreen: 'screen-dashboard', // 'screen-dashboard' | 'screen-domain-picker' | 'screen-quiz' | 'screen-results' | 'screen-study'
  currentMode: null,
  activeQuestions: [], // Shuffled & rotated questions for the current session
  currentIndex: 0,
  userAnswers: {}, // { [questionIndex]: [selectedOptionIndices] }
  flaggedQuestions: new Set(),
  startTime: null,
  elapsedSeconds: 0,
  timerInterval: null,
  timerRemainingSeconds: 120 * 60, // Default 120 mins
  timerPaused: false,
  instantFeedback: false,
  shuffleOptions: true,
  timerEnabled: true,
  reviewFilter: 'all',
  examResults: null,
  // Study Hub State
  studyTab: 'theory-concepts',
  theorySearchQuery: '',
  theoryActiveDomain: 'all',
  gitSearchQuery: '',
  gitActiveCategory: 'all'
};

// DOM Elements
const elements = {
  // Screens
  screens: {
    dashboard: document.getElementById('screen-dashboard'),
    domainPicker: document.getElementById('screen-domain-picker'),
    quiz: document.getElementById('screen-quiz'),
    results: document.getElementById('screen-results'),
    study: document.getElementById('screen-study'),
    lab: document.getElementById('screen-lab')
  },
  // Topbar / Header
  btnHome: document.getElementById('btn-home'),
  navTabExam: document.getElementById('nav-tab-exam'),
  navTabStudy: document.getElementById('nav-tab-study'),
  navTabLab: document.getElementById('nav-tab-lab'),
  timerDisplay: document.getElementById('timer-display'),
  timeRemaining: document.getElementById('time-remaining'),
  btnPauseTimer: document.getElementById('btn-pause-timer'),
  btnToggleTheme: document.getElementById('btn-toggle-theme'),
  
  // Dashboard
  statTotalQ: document.getElementById('stat-total-q'),
  prefInstantFeedback: document.getElementById('pref-instant-feedback'),
  prefShuffleOptions: document.getElementById('pref-shuffle-options'),
  prefTimerToggle: document.getElementById('pref-timer-toggle'),
  historyList: document.getElementById('history-list'),
  btnClearHistory: document.getElementById('btn-clear-history'),
  btnBackToDash: document.getElementById('btn-back-to-dash'),
  domainListCards: document.getElementById('domain-list-cards'),
  
  // Quiz
  currentQIndex: document.getElementById('current-q-index'),
  totalQCount: document.getElementById('total-q-count'),
  quizProgressBar: document.getElementById('quiz-progress-bar'),
  btnFlagQuestion: document.getElementById('btn-flag-question'),
  btnToggleGrid: document.getElementById('btn-toggle-grid'),
  questionDomainBadge: document.getElementById('question-domain-badge'),
  questionTypeBadge: document.getElementById('question-type-badge'),
  questionSourceBadge: document.getElementById('question-source-badge'),
  questionText: document.getElementById('question-text'),
  optionsContainer: document.getElementById('options-container'),
  explanationBox: document.getElementById('explanation-box'),
  explanationStatus: document.getElementById('explanation-status'),
  explSourceName: document.getElementById('expl-source-name'),
  explanationText: document.getElementById('explanation-text'),
  btnPrevQuestion: document.getElementById('btn-prev-question'),
  btnNextQuestion: document.getElementById('btn-next-question'),
  btnSubmitExam: document.getElementById('btn-submit-exam'),
  btnClearSelection: document.getElementById('btn-clear-selection'),
  
  // Drawer
  drawerNavigator: document.getElementById('drawer-navigator'),
  drawerOverlay: document.getElementById('drawer-overlay'),
  btnCloseDrawer: document.getElementById('btn-close-drawer'),
  drawerGrid: document.getElementById('drawer-grid'),
  btnDrawerSubmit: document.getElementById('btn-drawer-submit'),
  
  // Results
  resultBanner: document.getElementById('result-badge-banner'),
  resultIcon: document.getElementById('result-icon'),
  resultTitle: document.getElementById('result-title'),
  resultSubtitle: document.getElementById('result-subtitle'),
  statScorePercent: document.getElementById('stat-score-percent'),
  statScoreFractions: document.getElementById('stat-score-fractions'),
  statTimeSpent: document.getElementById('stat-time-spent'),
  statFlaggedCount: document.getElementById('stat-flagged-count'),
  domainScoreBars: document.getElementById('domain-score-bars'),
  btnReviewQuestions: document.getElementById('btn-review-questions'),
  btnRetakeRotated: document.getElementById('btn-retake-rotated'),
  btnBackDashboardEnd: document.getElementById('btn-back-dashboard-end'),
  reviewSection: document.getElementById('review-section'),
  reviewListItems: document.getElementById('review-list-items'),
  filterCountAll: document.getElementById('filter-count-all'),
  filterCountIncorrect: document.getElementById('filter-count-incorrect'),
  filterCountFlagged: document.getElementById('filter-count-flagged'),

  // Study Hub Elements
  inputSearchTheory: document.getElementById('input-search-theory'),
  theoryModulesContainer: document.getElementById('theory-modules-container'),
  inputSearchGit: document.getElementById('input-search-git'),
  gitCommandsGrid: document.getElementById('git-commands-grid'),
  ghCommandsGrid: document.getElementById('gh-commands-grid'),
  repoFilesGrid: document.getElementById('repo-files-grid'),

  // Terminal Lab Elements
  selectLabLesson: document.getElementById('select-lab-lesson'),
  labLessonCat: document.getElementById('lab-lesson-cat'),
  labLessonTitle: document.getElementById('lab-lesson-title'),
  labLessonDesc: document.getElementById('lab-lesson-desc'),
  labTasksList: document.getElementById('lab-tasks-list'),
  btnLabHint: document.getElementById('btn-lab-hint'),
  labHintCount: document.getElementById('lab-hint-count'),
  btnLabSolution: document.getElementById('btn-lab-solution'),
  labHintBox: document.getElementById('lab-hint-box'),
  labSolutionBox: document.getElementById('lab-solution-box'),
  labSolutionCode: document.getElementById('lab-solution-code'),
  btnPasteSolution: document.getElementById('btn-paste-solution'),
  labFeedbackBox: document.getElementById('lab-feedback-box'),
  btnCheckTask: document.getElementById('btn-check-task'),
  btnResetSandbox: document.getElementById('btn-reset-sandbox'),
  btnNextLesson: document.getElementById('btn-next-lesson'),
  terminalTitle: document.getElementById('terminal-title'),
  btnClearTerm: document.getElementById('btn-clear-term'),
  terminalBody: document.getElementById('terminal-body'),
  terminalOutput: document.getElementById('terminal-output'),
  terminalPrompt: document.getElementById('terminal-prompt'),
  terminalInput: document.getElementById('terminal-input'),

  // Nano Editor Elements
  nanoEditorView: document.getElementById('nano-editor-view'),
  nanoFilename: document.getElementById('nano-filename'),
  nanoTextarea: document.getElementById('nano-textarea'),
  nanoStatusMsg: document.getElementById('nano-status-msg'),
  btnNanoSave: document.getElementById('btn-nano-save'),
  btnNanoCancel: document.getElementById('btn-nano-cancel')
};

// Utilities
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Prepare question with optional option shuffling
function prepareQuestionSession(q, shuffleChoices = true) {
  if (!shuffleChoices || q.type === 'boolean') {
    // For boolean (True/False), maintain True then False
    return {
      ...q,
      sessionOptions: [...q.options],
      sessionCorrectAnswer: [...q.correctAnswer]
    };
  }

  // Map choices to track original index
  const indexedOptions = q.options.map((opt, idx) => ({
    text: opt,
    isCorrect: q.correctAnswer.includes(idx)
  }));

  const shuffled = shuffleArray(indexedOptions);
  const newCorrect = [];
  shuffled.forEach((item, idx) => {
    if (item.isCorrect) newCorrect.push(idx);
  });

  return {
    ...q,
    sessionOptions: shuffled.map(o => o.text),
    sessionCorrectAnswer: newCorrect
  };
}

// Setup & Initialization
function init() {
  elements.statTotalQ.textContent = QUESTION_BANK.length;
  loadPreferences();
  renderHistory();
  setupEventListeners();
  renderDomainPickerCards();
  initStudyHub();
  initTerminalLab();
}

// GitHub Dark & Light Theme Engine
function applyTheme(theme) {
  const isLight = theme === 'light';
  document.body.classList.toggle('light-theme', isLight);
  document.body.classList.toggle('dark-theme', !isLight);

  const toggleBtn = document.getElementById('btn-theme-toggle');
  if (toggleBtn) {
    const sunIcon = toggleBtn.querySelector('.theme-icon-sun');
    const moonIcon = toggleBtn.querySelector('.theme-icon-moon');
    const label = toggleBtn.querySelector('.theme-label');

    if (isLight) {
      if (sunIcon) sunIcon.classList.remove('hidden');
      if (moonIcon) moonIcon.classList.add('hidden');
      if (label) label.textContent = 'Light';
      toggleBtn.title = 'Switch to GitHub Dark Mode';
    } else {
      if (sunIcon) sunIcon.classList.add('hidden');
      if (moonIcon) moonIcon.classList.remove('hidden');
      if (label) label.textContent = 'Dark';
      toggleBtn.title = 'Switch to GitHub Light Mode';
    }
  }

  localStorage.setItem('gh_prep_theme', isLight ? 'light' : 'dark');
}

function loadPreferences() {
  const savedTheme = localStorage.getItem('gh_prep_theme') || 'dark';
  applyTheme(savedTheme);
const savedInstant = localStorage.getItem('gh_prep_pref_instant');
  if (savedInstant !== null) {
    elements.prefInstantFeedback.checked = savedInstant === 'true';
    state.instantFeedback = elements.prefInstantFeedback.checked;
  }

  const savedShuffle = localStorage.getItem('gh_prep_pref_shuffle');
  if (savedShuffle !== null) {
    elements.prefShuffleOptions.checked = savedShuffle === 'true';
    state.shuffleOptions = elements.prefShuffleOptions.checked;
  }

  const savedTimer = localStorage.getItem('gh_prep_pref_timer');
  if (savedTimer !== null) {
    elements.prefTimerToggle.checked = savedTimer === 'true';
    state.timerEnabled = elements.prefTimerToggle.checked;
  }
}

// Navigation between screens
function showScreen(screenId) {
  Object.values(elements.screens).forEach(screen => {
    if (screen) screen.classList.remove('active');
  });
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
    state.currentScreen = screenId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update Header Nav Tabs active state
  if (elements.navTabStudy && elements.navTabExam && elements.navTabLab) {
    elements.navTabExam.classList.remove('active');
    elements.navTabStudy.classList.remove('active');
    elements.navTabLab.classList.remove('active');

    if (screenId === 'screen-study') {
      elements.navTabStudy.classList.add('active');
    } else if (screenId === 'screen-lab') {
      elements.navTabLab.classList.add('active');
      setTimeout(() => elements.terminalInput && elements.terminalInput.focus(), 80);
    } else {
      elements.navTabExam.classList.add('active');
    }
  }

  // Manage header timer visibility
  if (screenId === 'screen-quiz' && state.timerEnabled) {
    elements.timerDisplay.classList.remove('hidden');
  } else {
    elements.timerDisplay.classList.add('hidden');
  }
}

// Event Listeners
function setupEventListeners() {
  // Brand Home click
  elements.btnHome.addEventListener('click', () => {
    if (state.currentScreen === 'screen-quiz') {
      if (confirm('Are you sure you want to return to dashboard? Your current exam progress will be lost.')) {
        stopTimer();
        showScreen('screen-dashboard');
      }
    } else {
      showScreen('screen-dashboard');
    }
  });

  // Nav Tabs click
  if (elements.navTabExam) {
    elements.navTabExam.addEventListener('click', () => {
      if (state.currentScreen === 'screen-quiz') {
        if (confirm('Leave the active quiz and return to Practice Exam Dashboard?')) {
          stopTimer();
          showScreen('screen-dashboard');
        }
      } else {
        showScreen('screen-dashboard');
      }
    });
  }

  if (elements.navTabStudy) {
    elements.navTabStudy.addEventListener('click', () => {
      if (state.currentScreen === 'screen-quiz') {
        if (confirm('Leave active quiz to open Study Hub? Your exam progress will end.')) {
          stopTimer();
          showScreen('screen-study');
        }
      } else {
        showScreen('screen-study');
      }
    });
  }

  if (elements.navTabLab) {
    elements.navTabLab.addEventListener('click', () => {
      if (state.currentScreen === 'screen-quiz') {
        if (confirm('Leave active quiz to open Terminal Lab? Your exam progress will end.')) {
          stopTimer();
          showScreen('screen-lab');
        }
      } else {
        showScreen('screen-lab');
      }
    });
  }

  // Theme Toggle Button (Dark / Light)
  const btnThemeToggle = document.getElementById('btn-theme-toggle');
  if (btnThemeToggle) {
    btnThemeToggle.addEventListener('click', () => {
      const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(nextTheme);
    });
  }

  // Footer Navigation and Topic Jump Buttons
  setupFooterListeners();

  // Preference changes
  elements.prefInstantFeedback.addEventListener('change', (e) => {
    state.instantFeedback = e.target.checked;
    localStorage.setItem('gh_prep_pref_instant', state.instantFeedback);
  });
  elements.prefShuffleOptions.addEventListener('change', (e) => {
    state.shuffleOptions = e.target.checked;
    localStorage.setItem('gh_prep_pref_shuffle', state.shuffleOptions);
  });
  elements.prefTimerToggle.addEventListener('change', (e) => {
    state.timerEnabled = e.target.checked;
    localStorage.setItem('gh_prep_pref_timer', state.timerEnabled);
  });

  // Clear history
  elements.btnClearHistory.addEventListener('click', () => {
    if (confirm('Clear all past exam performance history?')) {
      localStorage.removeItem('gh_prep_exam_history');
      renderHistory();
    }
  });

  // Mode launch buttons
  document.querySelectorAll('.btn-start-mode').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const mode = e.currentTarget.getAttribute('data-mode');
      handleModeSelect(mode);
    });
  });

  // Back from Domain Picker
  elements.btnBackToDash.addEventListener('click', () => {
    showScreen('screen-dashboard');
  });

  // Quiz Navigation
  elements.btnPrevQuestion.addEventListener('click', () => {
    if (state.currentIndex > 0) {
      goToQuestion(state.currentIndex - 1);
    }
  });

  elements.btnNextQuestion.addEventListener('click', () => {
    if (state.currentIndex < state.activeQuestions.length - 1) {
      goToQuestion(state.currentIndex + 1);
    }
  });

  elements.btnSubmitExam.addEventListener('click', () => {
    submitExamPrompt();
  });

  elements.btnClearSelection.addEventListener('click', () => {
    delete state.userAnswers[state.currentIndex];
    renderQuestion(state.currentIndex);
    updateNavigatorDrawer();
  });

  elements.btnFlagQuestion.addEventListener('click', () => {
    toggleFlagQuestion(state.currentIndex);
  });

  // Drawer
  elements.btnToggleGrid.addEventListener('click', () => openDrawer());
  elements.btnCloseDrawer.addEventListener('click', () => closeDrawer());
  elements.drawerOverlay.addEventListener('click', () => closeDrawer());
  elements.btnDrawerSubmit.addEventListener('click', () => {
    closeDrawer();
    submitExamPrompt();
  });

  // Timer Pause
  elements.btnPauseTimer.addEventListener('click', toggleTimerPause);

  // Results Actions
  elements.btnReviewQuestions.addEventListener('click', () => {
    elements.reviewSection.classList.toggle('hidden');
    if (!elements.reviewSection.classList.contains('hidden')) {
      elements.reviewSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

  elements.btnRetakeRotated.addEventListener('click', () => {
    handleModeSelect(state.currentMode);
  });

  elements.btnBackDashboardEnd.addEventListener('click', () => {
    showScreen('screen-dashboard');
    renderHistory();
  });

  // Review Filters
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      e.currentTarget.classList.add('active');
      state.reviewFilter = e.currentTarget.getAttribute('data-filter');
      renderReviewCards();
    });
  });

  // Keyboard Shortcuts
  window.addEventListener('keydown', handleKeyShortcuts);
}

function handleKeyShortcuts(e) {
  if (state.currentScreen !== 'screen-quiz') return;

  // Options 1, 2, 3, 4 or A, B, C, D
  const key = e.key.toUpperCase();
  const optionMap = { '1': 0, '2': 1, '3': 2, '4': 3, 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
  if (key in optionMap) {
    const optIndex = optionMap[key];
    const q = state.activeQuestions[state.currentIndex];
    if (q && optIndex < q.sessionOptions.length) {
      handleOptionSelect(optIndex);
    }
  }

  // Navigation
  if (e.key === 'ArrowRight' || key === 'N') {
    if (state.currentIndex < state.activeQuestions.length - 1) {
      goToQuestion(state.currentIndex + 1);
    }
  } else if (e.key === 'ArrowLeft' || key === 'P') {
    if (state.currentIndex > 0) {
      goToQuestion(state.currentIndex - 1);
    }
  } else if (key === 'F') {
    toggleFlagQuestion(state.currentIndex);
  }
}

// Mode Selection Handler
function handleModeSelect(mode) {
  state.currentMode = mode;
  state.currentIndex = 0;
  state.userAnswers = {};
  state.flaggedQuestions.clear();
  state.elapsedSeconds = 0;
  state.timerRemainingSeconds = 120 * 60; // 120 min default for exam

  let questions = [];

  switch (mode) {
    case 'official-exam':
      // 75 rotated questions across all domains
      state.instantFeedback = false;
      state.timerEnabled = true;
      questions = shuffleArray(QUESTION_BANK).slice(0, 75);
      break;

    case 'standard-assessment':
      // 50 rotated questions (like MS Learn Practice Assessment)
      state.instantFeedback = elements.prefInstantFeedback.checked;
      state.timerEnabled = elements.prefTimerToggle.checked;
      state.timerRemainingSeconds = 90 * 60;
      questions = shuffleArray(QUESTION_BANK).slice(0, 50);
      break;

    case 'quick-sprint':
      // 20 rotated questions with instant feedback
      state.instantFeedback = true;
      state.timerEnabled = false;
      questions = shuffleArray(QUESTION_BANK).slice(0, 20);
      break;

    case 'true-false-drill':
      // All True / False questions
      state.instantFeedback = true;
      state.timerEnabled = false;
      questions = shuffleArray(QUESTION_BANK.filter(q => q.type === 'boolean'));
      break;

    case 'domain-practice':
      // Show Domain selection screen first
      showScreen('screen-domain-picker');
      return;

    case 'full-bank':
      // All 115+ questions
      state.instantFeedback = elements.prefInstantFeedback.checked;
      state.timerEnabled = false;
      questions = shuffleArray(QUESTION_BANK);
      break;

    default:
      questions = shuffleArray(QUESTION_BANK).slice(0, 50);
  }

  startQuizWithQuestions(questions);
}

function startQuizWithQuestions(rawQuestions) {
  // Prepare with option shuffling
  state.activeQuestions = rawQuestions.map(q => prepareQuestionSession(q, state.shuffleOptions));
  
  elements.totalQCount.textContent = state.activeQuestions.length;
  elements.reviewSection.classList.add('hidden');

  showScreen('screen-quiz');
  goToQuestion(0);

  if (state.timerEnabled) {
    startTimer();
  }
}

// Domain Picker UI
function renderDomainPickerCards() {
  const domains = Object.values(DOMAINS);
  elements.domainListCards.innerHTML = '';

  domains.forEach(domainName => {
    const domainQuestions = QUESTION_BANK.filter(q => q.domain === domainName);
    const card = document.createElement('div');
    card.className = 'domain-pick-card';
    card.innerHTML = `
      <h3>${domainName}</h3>
      <p>Targeted training questions based on Microsoft GH-900 curriculum & GitHub Docs.</p>
      <div class="domain-card-footer">
        <span>📋 ${domainQuestions.length} Questions</span>
        <span>Start Domain →</span>
      </div>
    `;

    card.addEventListener('click', () => {
      state.currentMode = 'domain-focus';
      state.instantFeedback = true;
      state.timerEnabled = false;
      startQuizWithQuestions(shuffleArray(domainQuestions));
    });

    elements.domainListCards.appendChild(card);
  });
}

// Timer Functions
function startTimer() {
  stopTimer();
  state.startTime = Date.now();
  elements.timeRemaining.textContent = formatTime(state.timerRemainingSeconds);
  elements.timerDisplay.classList.remove('warning', 'critical');

  state.timerInterval = setInterval(() => {
    if (state.timerPaused) return;

    state.timerRemainingSeconds--;
    state.elapsedSeconds++;

    if (state.timerRemainingSeconds <= 0) {
      stopTimer();
      alert('Time is up! Submitting exam automatically.');
      finishExam();
      return;
    }

    elements.timeRemaining.textContent = formatTime(state.timerRemainingSeconds);

    if (state.timerRemainingSeconds < 5 * 60) {
      elements.timerDisplay.classList.add('critical');
    } else if (state.timerRemainingSeconds < 15 * 60) {
      elements.timerDisplay.classList.add('warning');
    }
  }, 1000);
}

function stopTimer() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
}

function toggleTimerPause() {
  state.timerPaused = !state.timerPaused;
  elements.btnPauseTimer.textContent = state.timerPaused ? '▶️' : '⏸️';
}

// Question Rendering & Navigation
function goToQuestion(index) {
  state.currentIndex = index;
  renderQuestion(index);
  updateProgressBar();
  updateNavigatorDrawer();
}

function renderQuestion(index) {
  const q = state.activeQuestions[index];
  if (!q) return;

  // Counter
  elements.currentQIndex.textContent = index + 1;

  // Domain Badge
  elements.questionDomainBadge.textContent = q.domain.split(':')[0]; // e.g. Domain 1
  
  // Type Badge
  if (q.type === 'multiple') {
    elements.questionTypeBadge.textContent = 'Select all that apply';
  } else if (q.type === 'boolean') {
    elements.questionTypeBadge.textContent = 'True or False';
  } else {
    elements.questionTypeBadge.textContent = 'Select only one answer';
  }

  // Source Badge
  elements.questionSourceBadge.textContent = q.source || 'GitHub Docs';

  // Question Text
  elements.questionText.textContent = q.question;

  // Flag state
  if (state.flaggedQuestions.has(index)) {
    elements.btnFlagQuestion.classList.add('flagged');
  } else {
    elements.btnFlagQuestion.classList.remove('flagged');
  }

  // Render Options
  const currentAnswer = state.userAnswers[index] || [];
  elements.optionsContainer.innerHTML = '';

  const alphabet = ['A', 'B', 'C', 'D', 'E'];

  q.sessionOptions.forEach((optionText, optIdx) => {
    const isSelected = currentAnswer.includes(optIdx);
    const optionDiv = document.createElement('div');
    optionDiv.className = `option-item ${isSelected ? 'selected' : ''}`;
    
    // Check if Instant Feedback should show right now
    if (state.instantFeedback && currentAnswer.length > 0) {
      const isCorrectOption = q.sessionCorrectAnswer.includes(optIdx);
      if (isCorrectOption) {
        optionDiv.classList.add('is-correct');
      } else if (isSelected && !isCorrectOption) {
        optionDiv.classList.add('is-incorrect');
      }
    }

    const indicatorLabel = q.type === 'boolean' 
      ? (optionText === 'True' ? 'T' : 'F') 
      : alphabet[optIdx] || (optIdx + 1);

    optionDiv.innerHTML = `
      <div class="option-indicator">${indicatorLabel}</div>
      <div class="option-text">${escapeHtml(optionText)}</div>
    `;

    optionDiv.addEventListener('click', () => {
      handleOptionSelect(optIdx);
    });

    elements.optionsContainer.appendChild(optionDiv);
  });

  // Explanation Box
  if (state.instantFeedback && currentAnswer.length > 0) {
    showExplanation(q, currentAnswer);
  } else {
    elements.explanationBox.classList.add('hidden');
  }

  // Navigation buttons
  elements.btnPrevQuestion.disabled = index === 0;

  const isLastQuestion = index === state.activeQuestions.length - 1;
  if (isLastQuestion) {
    elements.btnNextQuestion.classList.add('hidden');
    elements.btnSubmitExam.classList.remove('hidden');
  } else {
    elements.btnNextQuestion.classList.remove('hidden');
    elements.btnSubmitExam.classList.add('hidden');
  }
}

function handleOptionSelect(optIndex) {
  const q = state.activeQuestions[state.currentIndex];
  let current = state.userAnswers[state.currentIndex] ? [...state.userAnswers[state.currentIndex]] : [];

  if (q.type === 'multiple') {
    // Multi-select toggle
    if (current.includes(optIndex)) {
      current = current.filter(i => i !== optIndex);
    } else {
      current.push(optIndex);
    }
  } else {
    // Single-choice or Boolean: replace
    current = [optIndex];
  }

  state.userAnswers[state.currentIndex] = current;
  renderQuestion(state.currentIndex);
  updateNavigatorDrawer();
}

function showExplanation(q, currentAnswer) {
  const isAllCorrect = q.sessionCorrectAnswer.length === currentAnswer.length &&
    q.sessionCorrectAnswer.every(val => currentAnswer.includes(val));

  elements.explanationBox.classList.remove('hidden');
  if (isAllCorrect) {
    elements.explanationStatus.textContent = '✅ Correct!';
    elements.explanationStatus.className = 'expl-verdict correct';
  } else {
    elements.explanationStatus.textContent = '❌ Incorrect';
    elements.explanationStatus.className = 'expl-verdict incorrect';
  }

  elements.explSourceName.textContent = q.source || 'GitHub Docs';
  elements.explanationText.textContent = q.explanation;
}

function toggleFlagQuestion(index) {
  if (state.flaggedQuestions.has(index)) {
    state.flaggedQuestions.delete(index);
    elements.btnFlagQuestion.classList.remove('flagged');
  } else {
    state.flaggedQuestions.add(index);
    elements.btnFlagQuestion.classList.add('flagged');
  }
  updateNavigatorDrawer();
}

function updateProgressBar() {
  const total = state.activeQuestions.length;
  const progressPercent = ((state.currentIndex + 1) / total) * 100;
  elements.quizProgressBar.style.width = `${progressPercent}%`;
}

// Drawer Navigator
function openDrawer() {
  updateNavigatorDrawer();
  elements.drawerNavigator.classList.add('open');
  elements.drawerOverlay.classList.add('open');
}

function closeDrawer() {
  elements.drawerNavigator.classList.remove('open');
  elements.drawerOverlay.classList.remove('open');
}

function updateNavigatorDrawer() {
  elements.drawerGrid.innerHTML = '';

  state.activeQuestions.forEach((_, idx) => {
    const btn = document.createElement('button');
    btn.className = 'nav-grid-btn';
    btn.textContent = idx + 1;

    const isAnswered = state.userAnswers[idx] && state.userAnswers[idx].length > 0;
    const isCurrent = idx === state.currentIndex;
    const isFlagged = state.flaggedQuestions.has(idx);

    if (isAnswered) btn.classList.add('answered');
    if (isCurrent) btn.classList.add('current');
    if (isFlagged) btn.classList.add('flagged');

    btn.addEventListener('click', () => {
      goToQuestion(idx);
      closeDrawer();
    });

    elements.drawerGrid.appendChild(btn);
  });
}

// Exam Submission & Grading
function submitExamPrompt() {
  const answeredCount = Object.keys(state.userAnswers).filter(k => state.userAnswers[k].length > 0).length;
  const total = state.activeQuestions.length;
  const unanswered = total - answeredCount;

  let msg = `Ready to submit your exam?\n\n• Answered: ${answeredCount} / ${total}\n`;
  if (unanswered > 0) {
    msg += `• Warning: You have ${unanswered} UNANSWERED questions!\n`;
  }
  if (state.flaggedQuestions.size > 0) {
    msg += `• You have ${state.flaggedQuestions.size} questions flagged for review.`;
  }

  if (confirm(msg)) {
    finishExam();
  }
}

function finishExam() {
  stopTimer();

  let correctCount = 0;
  const domainStats = {};

  // Initialize domains in stats
  Object.values(DOMAINS).forEach(dom => {
    domainStats[dom] = { correct: 0, total: 0 };
  });

  const questionResults = state.activeQuestions.map((q, idx) => {
    const userAns = state.userAnswers[idx] || [];
    const isCorrect = q.sessionCorrectAnswer.length === userAns.length &&
      q.sessionCorrectAnswer.every(val => userAns.includes(val));

    if (isCorrect) correctCount++;

    if (domainStats[q.domain]) {
      domainStats[q.domain].total++;
      if (isCorrect) domainStats[q.domain].correct++;
    }

    return {
      question: q,
      userAns,
      isCorrect,
      isFlagged: state.flaggedQuestions.has(idx)
    };
  });

  const total = state.activeQuestions.length;
  const scorePercent = Math.round((correctCount / total) * 100);
  const passed = scorePercent >= 70; // 70% passing threshold for GitHub certification

  state.examResults = {
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    mode: state.currentMode || 'Standard',
    scorePercent,
    correctCount,
    total,
    passed,
    timeSpentSeconds: state.elapsedSeconds || (120 * 60 - state.timerRemainingSeconds),
    flaggedCount: state.flaggedQuestions.size,
    domainStats,
    questionResults
  };

  saveHistory(state.examResults);
  renderResultsScreen(state.examResults);
  showScreen('screen-results');
}

function renderResultsScreen(res) {
  // Banner
  if (res.passed) {
    elements.resultBanner.className = 'result-banner pass';
    elements.resultIcon.textContent = '🎉';
    elements.resultTitle.textContent = 'Congratulations! You Passed!';
    elements.resultSubtitle.textContent = `You scored ${res.scorePercent}%, exceeding the 70% passing standard for GitHub Foundations.`;
  } else {
    elements.resultBanner.className = 'result-banner fail';
    elements.resultIcon.textContent = '📚';
    elements.resultTitle.textContent = 'Keep Practicing — Needs Improvement';
    elements.resultSubtitle.textContent = `You scored ${res.scorePercent}%. GitHub certification requires 70% to pass. Review weak domains below!`;
  }

  // Summary Grid
  elements.statScorePercent.textContent = `${res.scorePercent}%`;
  elements.statScorePercent.style.color = res.passed ? 'var(--accent-green-bright)' : 'var(--accent-red-bright)';
  elements.statScoreFractions.textContent = `${res.correctCount} / ${res.total} correct`;
  elements.statTimeSpent.textContent = formatTime(res.timeSpentSeconds);
  elements.statFlaggedCount.textContent = res.flaggedCount;

  // Domain Breakdown Bars
  elements.domainScoreBars.innerHTML = '';
  Object.entries(res.domainStats).forEach(([domainName, data]) => {
    if (data.total === 0) return;

    const pct = Math.round((data.correct / data.total) * 100);
    let colorClass = 'good';
    if (pct < 60) colorClass = 'bad';
    else if (pct < 75) colorClass = 'warn';

    const item = document.createElement('div');
    item.className = 'domain-bar-item';
    item.innerHTML = `
      <div class="domain-bar-header">
        <strong>${domainName}</strong>
        <span class="domain-pct ${colorClass}">${data.correct}/${data.total} (${pct}%)</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill ${colorClass}" style="width: ${pct}%;"></div>
      </div>
    `;
    elements.domainScoreBars.appendChild(item);
  });

  // Filter counts
  const incorrectCount = res.questionResults.filter(r => !r.isCorrect).length;
  elements.filterCountAll.textContent = res.total;
  elements.filterCountIncorrect.textContent = incorrectCount;
  elements.filterCountFlagged.textContent = res.flaggedCount;

  renderReviewCards();
}

function renderReviewCards() {
  if (!state.examResults) return;

  let items = state.examResults.questionResults;
  if (state.reviewFilter === 'incorrect') {
    items = items.filter(r => !r.isCorrect);
  } else if (state.reviewFilter === 'flagged') {
    items = items.filter(r => r.isFlagged);
  }

  elements.reviewListItems.innerHTML = '';

  if (items.length === 0) {
    elements.reviewListItems.innerHTML = '<div class="history-empty">No questions match this filter. Excellent job!</div>';
    return;
  }

  items.forEach((item, reviewIdx) => {
    const q = item.question;
    const card = document.createElement('div');
    card.className = `review-card ${item.isCorrect ? 'correct' : 'incorrect'}`;

    let optionsMarkup = '';
    const alphabet = ['A', 'B', 'C', 'D', 'E'];

    q.sessionOptions.forEach((optText, optIdx) => {
      const isUserChoice = item.userAns.includes(optIdx);
      const isCorrectChoice = q.sessionCorrectAnswer.includes(optIdx);

      let optClass = 'review-option';
      let tag = '';

      if (isCorrectChoice) {
        optClass += ' correct-answer';
        tag = ' ✓ (Correct Answer)';
      } else if (isUserChoice && !isCorrectChoice) {
        optClass += ' user-selected-wrong';
        tag = ' ✗ (Your Answer)';
      }

      optionsMarkup += `
        <div class="${optClass}">
          <strong>${alphabet[optIdx] || optIdx + 1}.</strong> ${escapeHtml(optText)} ${tag}
        </div>
      `;
    });

    card.innerHTML = `
      <div class="review-card-meta">
        <span class="badge-domain">${escapeHtml(q.domain.split(':')[0])}</span>
        <span class="badge-type">${item.isCorrect ? '✅ Correct' : '❌ Incorrect'}</span>
        ${item.isFlagged ? '<span class="badge-cert">🚩 Flagged</span>' : ''}
      </div>
      <h4 class="review-card-prompt">${reviewIdx + 1}. ${escapeHtml(q.question)}</h4>
      <div class="review-options">
        ${optionsMarkup}
      </div>
      <div class="review-expl">
        <strong>💡 Explanation (${escapeHtml(q.source || 'GitHub Docs')}):</strong> ${escapeHtml(q.explanation)}
      </div>
    `;

    elements.reviewListItems.appendChild(card);
  });
}

// Local Storage History
function saveHistory(result) {
  try {
    const history = JSON.parse(localStorage.getItem('gh_prep_exam_history') || '[]');
    history.unshift({
      date: result.date,
      mode: result.mode,
      scorePercent: result.scorePercent,
      correctCount: result.correctCount,
      total: result.total,
      passed: result.passed
    });
    // Keep last 15
    localStorage.setItem('gh_prep_exam_history', JSON.stringify(history.slice(0, 15)));
  } catch (e) {
    console.error('Error saving history', e);
  }
}

function renderHistory() {
  try {
    const history = JSON.parse(localStorage.getItem('gh_prep_exam_history') || '[]');
    if (history.length === 0) {
      elements.historyList.innerHTML = '<div class="history-empty">No exams completed yet. Take your first practice test to track performance!</div>';
      return;
    }

    elements.historyList.innerHTML = '';
    history.forEach(item => {
      const div = document.createElement('div');
      div.className = 'history-item';
      div.innerHTML = `
        <div class="hist-left">
          <span class="hist-mode">${item.mode} (${item.correctCount}/${item.total})</span>
          <span class="hist-date">${item.date}</span>
        </div>
        <div class="hist-score ${item.passed ? 'pass' : 'fail'}">
          ${item.scorePercent}%
        </div>
      `;
      elements.historyList.appendChild(div);
    });
  } catch (e) {
    elements.historyList.innerHTML = '<div class="history-empty">Unable to load history.</div>';
  }
}

// =========================================
// STUDY HUB INITIALIZATION & LOGIC
// =========================================
function initStudyHub() {
  // Sub-tabs switching
  document.querySelectorAll('.study-subtab').forEach(tabBtn => {
    tabBtn.addEventListener('click', (e) => {
      document.querySelectorAll('.study-subtab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.study-pane').forEach(p => p.classList.remove('active'));

      e.currentTarget.classList.add('active');
      const targetSubtab = e.currentTarget.getAttribute('data-subtab');
      state.studyTab = targetSubtab;

      const pane = document.getElementById(`subtab-pane-${targetSubtab}`);
      if (pane) pane.classList.add('active');
    });
  });

  // Search Theory concepts
  if (elements.inputSearchTheory) {
    elements.inputSearchTheory.addEventListener('input', (e) => {
      state.theorySearchQuery = e.target.value.toLowerCase().trim();
      renderTheoryModules();
    });
  }

  // Domain filter pills for Theory
  const domainPills = document.querySelectorAll('#theory-domain-pills .filter-pill');
  domainPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      domainPills.forEach(p => p.classList.remove('active'));
      e.currentTarget.classList.add('active');
      state.theoryActiveDomain = e.currentTarget.getAttribute('data-domain');
      renderTheoryModules();
    });
  });

  // Search Git commands
  if (elements.inputSearchGit) {
    elements.inputSearchGit.addEventListener('input', (e) => {
      state.gitSearchQuery = e.target.value.toLowerCase().trim();
      renderGitCommands();
    });
  }

  // Category filter pills for Git
  const catPills = document.querySelectorAll('#git-category-pills .filter-pill');
  catPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      catPills.forEach(p => p.classList.remove('active'));
      e.currentTarget.classList.add('active');
      state.gitActiveCategory = e.currentTarget.getAttribute('data-cat');
      renderGitCommands();
    });
  });

  renderTheoryModules();
  renderGitCommands();
  renderGitHubCliCommands();
  renderRepoFiles();
}

function renderTheoryModules() {
  if (!elements.theoryModulesContainer) return;

  let modules = THEORY_MODULES;

  // Filter by domain
  if (state.theoryActiveDomain !== 'all') {
    modules = modules.filter(m => m.domain === state.theoryActiveDomain);
  }

  // Filter by search query
  if (state.theorySearchQuery) {
    modules = modules.filter(m => {
      const matchModule = m.title.toLowerCase().includes(state.theorySearchQuery) ||
                          m.summary.toLowerCase().includes(state.theorySearchQuery);
      const matchSection = m.sections.some(s => 
        s.heading.toLowerCase().includes(state.theorySearchQuery) ||
        s.content.toLowerCase().includes(state.theorySearchQuery)
      );
      return matchModule || matchSection;
    });
  }

  elements.theoryModulesContainer.innerHTML = '';

  if (modules.length === 0) {
    elements.theoryModulesContainer.innerHTML = `
      <div class="history-empty" style="padding: 2.5rem 1rem;">
        No theory modules found matching "${escapeHtml(state.theorySearchQuery)}".
      </div>
    `;
    return;
  }

  modules.forEach(mod => {
    const fullIndex = THEORY_MODULES.findIndex(m => m.id === mod.id);
    const prevMod = fullIndex > 0 ? THEORY_MODULES[fullIndex - 1] : null;
    const nextMod = fullIndex < THEORY_MODULES.length - 1 ? THEORY_MODULES[fullIndex + 1] : null;

    const card = document.createElement('div');
    card.className = 'theory-module-card';
    card.id = mod.id;

    const sectionsHtml = mod.sections.map(sec => `
      <div class="theory-section-box">
        <h4>${sec.heading}</h4>
        ${sec.content}
      </div>
    `).join('');

    card.innerHTML = `
      <div class="theory-module-header">
        <div class="theory-header-left">
          <span class="theory-domain-tag">${escapeHtml(mod.domain)}</span>
          <h3>${escapeHtml(mod.title)}</h3>
          <p>${escapeHtml(mod.summary)}</p>
        </div>
        <div class="theory-expand-btn" title="Toggle section">▼</div>
      </div>
      <div class="theory-sections-body">
        ${sectionsHtml}

        <div class="theory-nav-footer">
          <div class="theory-footer-left">
            ${prevMod ? `<button class="btn-secondary btn-theory-nav btn-prev-domain" data-target="${prevMod.id}">← Previous: ${escapeHtml(prevMod.domain)}</button>` : ''}
          </div>
          <div class="theory-footer-center">
            <button class="btn-outline btn-theory-practice" data-domain="${escapeHtml(mod.domain)}">Practice ${escapeHtml(mod.domain)} Questions</button>
          </div>
          <div class="theory-footer-right">
            ${nextMod 
              ? `<button class="btn-primary btn-theory-nav btn-next-domain" data-target="${nextMod.id}">Next: ${escapeHtml(nextMod.domain)} →</button>`
              : `<button class="btn-primary btn-theory-exam">Take Full Practice Exam →</button>`
            }
          </div>
        </div>
      </div>
    `;

    // Accordion toggle on header click
    const header = card.querySelector('.theory-module-header');
    header.addEventListener('click', (e) => {
      // Don't toggle if clicking inside footer
      if (e.target.closest('.theory-nav-footer')) return;
      card.classList.toggle('collapsed');
    });

    // Practice button click
    const practiceBtn = card.querySelector('.btn-theory-practice');
    if (practiceBtn) {
      practiceBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const domainPrefix = e.currentTarget.getAttribute('data-domain');
        const domainFullName = Object.values(DOMAINS).find(d => d.startsWith(domainPrefix));
        if (domainFullName) {
          const domainQuestions = QUESTION_BANK.filter(q => q.domain === domainFullName);
          state.currentMode = 'domain-focus';
          state.instantFeedback = true;
          state.timerEnabled = false;
          startQuizWithQuestions(shuffleArray(domainQuestions));
        }
      });
    }

    // Previous domain button click
    const prevBtn = card.querySelector('.btn-prev-domain');
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetId = e.currentTarget.getAttribute('data-target');
        navigateToTheoryModule(targetId);
      });
    }

    // Next domain button click
    const nextBtn = card.querySelector('.btn-next-domain');
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetId = e.currentTarget.getAttribute('data-target');
        navigateToTheoryModule(targetId);
      });
    }

    // Exam button click on last domain
    const examBtn = card.querySelector('.btn-theory-exam');
    if (examBtn) {
      examBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleModeSelect('official-exam');
      });
    }

    elements.theoryModulesContainer.appendChild(card);
  });
}

function navigateToTheoryModule(targetId) {
  const targetMod = THEORY_MODULES.find(m => m.id === targetId);
  if (!targetMod) return;

  // If a domain filter was active and not matching, reset domain filter to 'all'
  if (state.theoryActiveDomain !== 'all' && state.theoryActiveDomain !== targetMod.domain) {
    state.theoryActiveDomain = 'all';
    document.querySelectorAll('#theory-domain-pills .filter-pill').forEach(p => {
      p.classList.toggle('active', p.getAttribute('data-domain') === 'all');
    });
    renderTheoryModules();
  }

  const targetCard = document.getElementById(targetId);
  if (targetCard) {
    targetCard.classList.remove('collapsed');
    targetCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Add brief visual highlight animation
    targetCard.style.borderColor = 'var(--accent-cyan)';
    setTimeout(() => {
      targetCard.style.borderColor = '';
    }, 1500);
  }
}

function renderGitCommands() {
  if (!elements.gitCommandsGrid) return;

  let filtered = GIT_COMMANDS;

  // Filter by category
  if (state.gitActiveCategory !== 'all') {
    filtered = filtered.filter(cmd => cmd.category === state.gitActiveCategory);
  }

  // Filter by search query
  if (state.gitSearchQuery) {
    filtered = filtered.filter(cmd => 
      cmd.command.toLowerCase().includes(state.gitSearchQuery) ||
      cmd.description.toLowerCase().includes(state.gitSearchQuery) ||
      cmd.syntax.toLowerCase().includes(state.gitSearchQuery) ||
      cmd.example.toLowerCase().includes(state.gitSearchQuery)
    );
  }

  elements.gitCommandsGrid.innerHTML = '';

  if (filtered.length === 0) {
    elements.gitCommandsGrid.innerHTML = `
      <div class="history-empty" style="grid-column: 1 / -1;">
        No Git commands found matching "${escapeHtml(state.gitSearchQuery)}".
      </div>
    `;
    return;
  }

  filtered.forEach(cmd => {
    const card = document.createElement('div');
    card.className = 'command-card';
    card.innerHTML = `
      <div class="cmd-header">
        <span class="cmd-name">${escapeHtml(cmd.command)}</span>
        <span class="cmd-cat-badge">${escapeHtml(cmd.category)}</span>
      </div>
      <div class="cmd-syntax-box">
        <code>${escapeHtml(cmd.syntax)}</code>
        <button class="btn-copy-cmd" data-copy="${escapeHtml(cmd.syntax)}">Copy</button>
      </div>
      <p class="cmd-desc">${escapeHtml(cmd.description)}</p>
      <div class="cmd-example">${escapeHtml(cmd.example)}</div>
      <div class="cmd-tip"><strong>Exam Tip:</strong> ${escapeHtml(cmd.examTip)}</div>
    `;

    // Copy event
    const copyBtn = card.querySelector('.btn-copy-cmd');
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(cmd.syntax).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1500);
      });
    });

    elements.gitCommandsGrid.appendChild(card);
  });
}

function renderGitHubCliCommands() {
  if (!elements.ghCommandsGrid) return;
  elements.ghCommandsGrid.innerHTML = '';

  GITHUB_CLI_COMMANDS.forEach(cmd => {
    const card = document.createElement('div');
    card.className = 'command-card';
    card.innerHTML = `
      <div class="cmd-header">
        <span class="cmd-name">${escapeHtml(cmd.command)}</span>
        <span class="cmd-cat-badge">GitHub CLI</span>
      </div>
      <div class="cmd-syntax-box">
        <code>${escapeHtml(cmd.syntax)}</code>
        <button class="btn-copy-cmd" data-copy="${escapeHtml(cmd.syntax)}">Copy</button>
      </div>
      <p class="cmd-desc">${escapeHtml(cmd.description)}</p>
    `;

    const copyBtn = card.querySelector('.btn-copy-cmd');
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(cmd.syntax).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1500);
      });
    });

    elements.ghCommandsGrid.appendChild(card);
  });
}

function renderRepoFiles() {
  if (!elements.repoFilesGrid) return;
  elements.repoFilesGrid.innerHTML = '';

  REPOSITORY_FILES.forEach(f => {
    const card = document.createElement('div');
    card.className = 'file-card';
    card.innerHTML = `
      <div class="file-card-top">
        <svg class="file-octicon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688Z"></path>
        </svg>
        <h4>${escapeHtml(f.fileName)}</h4>
      </div>
      <p class="file-purpose">${escapeHtml(f.purpose)}</p>
      <div class="file-loc">Location: <code>${escapeHtml(f.location)}</code></div>
    `;
    elements.repoFilesGrid.appendChild(card);
  });
}

// ==========================================
// TERMINAL LAB / INTERACTIVE SIMULATOR LOGIC
// ==========================================
const labState = {
  terminal: null,
  currentLessonIndex: 0,
  revealedHints: 0,
  solutionVisible: false
};

function formatAnsi(str) {
  if (typeof str !== 'string') return '';
  let safe = escapeHtml(str);
  safe = safe
    .replace(/(\u001b|\\x1b)\[32m/g, '<span class="term-green">')
    .replace(/(\u001b|\\x1b)\[31m/g, '<span class="term-red">')
    .replace(/(\u001b|\\x1b)\[33m/g, '<span class="term-yellow">')
    .replace(/(\u001b|\\x1b)\[36m/g, '<span class="term-cyan">')
    .replace(/(\u001b|\\x1b)\[35m/g, '<span class="term-magenta">')
    .replace(/(\u001b|\\x1b)\[0m/g, '</span>')
    .replace(/(\u001b|\\x1b)\[[0-9;]*m/g, '');
  return safe;
}

function formatTaskText(text) {
  return escapeHtml(text).replace(/`([^`]+)`/g, '<code>$1</code>');
}

function initTerminalLab() {
  if (!elements.selectLabLesson) return;

  labState.terminal = new VirtualTerminal();

  // Populate lesson dropdown
  elements.selectLabLesson.innerHTML = LAB_LESSONS.map((lesson, idx) => 
    `<option value="${idx}">${escapeHtml(lesson.title)}</option>`
  ).join('');

  elements.selectLabLesson.addEventListener('change', (e) => {
    loadLabLesson(parseInt(e.target.value, 10));
  });

  // Terminal input submit & key handling
  elements.terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = elements.terminalInput.value;
      elements.terminalInput.value = '';
      if (val.trim()) {
        executeTerminalCommand(val);
      } else {
        const entry = document.createElement('div');
        entry.className = 'terminal-cmd-entry';
        entry.innerHTML = `<span class="prompt">${escapeHtml(labState.terminal.getPrompt())}</span>`;
        elements.terminalOutput.appendChild(entry);
        elements.terminalOutput.scrollTop = elements.terminalOutput.scrollHeight;
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (labState.terminal.history.length > 0 && labState.terminal.historyIndex > 0) {
        labState.terminal.historyIndex--;
        elements.terminalInput.value = labState.terminal.history[labState.terminal.historyIndex] || '';
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (labState.terminal.historyIndex < labState.terminal.history.length - 1) {
        labState.terminal.historyIndex++;
        elements.terminalInput.value = labState.terminal.history[labState.terminal.historyIndex] || '';
      } else {
        labState.terminal.historyIndex = labState.terminal.history.length;
        elements.terminalInput.value = '';
      }
    }
  });

  // Click on terminal body focuses input
  elements.terminalBody.addEventListener('click', () => {
    if (window.getSelection().toString().length === 0) {
      elements.terminalInput.focus();
    }
  });

  // Clear button
  elements.btnClearTerm.addEventListener('click', () => {
    elements.terminalOutput.innerHTML = '';
    elements.terminalInput.focus();
  });



  // Toggle Full Width / Expand Terminal
  const btnToggleExpand = document.getElementById('btn-toggle-expand');
  const labLayout = document.querySelector('.lab-layout');
  if (btnToggleExpand && labLayout) {
    btnToggleExpand.addEventListener('click', () => {
      const isExpanded = labLayout.classList.toggle('expanded-terminal');
      btnToggleExpand.textContent = isExpanded ? 'Restore' : 'Expand';
      btnToggleExpand.title = isExpanded ? 'Restore Sidebar View' : 'Toggle Full Width Terminal';
      if (elements.terminalInput) elements.terminalInput.focus();
    });
  }

  // Nano Editor Controls
  function closeNanoEditor(saved = false, linesWritten = 0, filename = '') {
    if (elements.nanoEditorView) elements.nanoEditorView.classList.add('hidden');
    if (elements.terminalBody) elements.terminalBody.classList.remove('hidden');
    if (saved) {
      printTerminalSystemMessage(`[ Wrote ${linesWritten} lines to ${filename} ]`);
    } else {
      printTerminalSystemMessage('[ Nano editor closed without saving ]');
    }
    elements.terminalPrompt.textContent = labState.terminal.getPrompt();
    elements.terminalInput.focus();
  }

  if (elements.btnNanoSave) {
    elements.btnNanoSave.addEventListener('click', () => {
      const filename = elements.nanoFilename.textContent;
      const content = elements.nanoTextarea.value;
      labState.terminal.saveNanoFile(filename, content);
      closeNanoEditor(true, content.split('\n').length, filename);
    });
  }

  if (elements.btnNanoCancel) {
    elements.btnNanoCancel.addEventListener('click', () => {
      closeNanoEditor(false);
    });
  }

  if (elements.nanoTextarea) {
    elements.nanoTextarea.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 'x' || e.key.toLowerCase() === 'o')) {
        e.preventDefault();
        elements.btnNanoSave.click();
      }
    });
  }

  // Quick Chips
  document.querySelectorAll('.quick-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        if (cmd === 'clear') {
          elements.terminalOutput.innerHTML = '';
          elements.terminalInput.value = '';
          elements.terminalInput.focus();
          return;
        }
        executeTerminalCommand(cmd);
        elements.terminalInput.value = '';
        elements.terminalInput.focus();
      }
    });
  });

  // Multi-tier Hint Button
  elements.btnLabHint.addEventListener('click', () => {
    const lesson = LAB_LESSONS[labState.currentLessonIndex];
    if (!lesson || !lesson.hints) return;

    if (labState.revealedHints < lesson.hints.length) {
      labState.revealedHints++;
    }

    renderLabHints(lesson);
  });

  // Show Solution Button
  elements.btnLabSolution.addEventListener('click', () => {
    labState.solutionVisible = !labState.solutionVisible;
    if (labState.solutionVisible) {
      elements.labSolutionBox.classList.remove('hidden');
      elements.btnLabSolution.textContent = 'Hide Solution';
    } else {
      elements.labSolutionBox.classList.add('hidden');
      elements.btnLabSolution.textContent = 'Show Solution';
    }
  });

  // Paste / Run Solution directly
  elements.btnPasteSolution.addEventListener('click', () => {
    const lesson = LAB_LESSONS[labState.currentLessonIndex];
    if (!lesson || !lesson.solution) return;

    const commands = lesson.solution.split('\n').map(c => c.trim()).filter(Boolean);
    commands.forEach(cmd => {
      executeTerminalCommand(cmd);
    });
    elements.terminalInput.focus();
  });

  // Check Task / Grade Answer
  elements.btnCheckTask.addEventListener('click', () => {
    const lesson = LAB_LESSONS[labState.currentLessonIndex];
    if (!lesson || !lesson.validate) return;

    const result = lesson.validate(labState.terminal);
    elements.labFeedbackBox.classList.remove('hidden');

    if (result.passed) {
      elements.labFeedbackBox.className = 'lab-feedback-box success';
      elements.labFeedbackBox.innerHTML = `
        <div style="font-weight:700; margin-bottom: 0.35rem;">TASK OBJECTIVES COMPLETE</div>
        <div>${escapeHtml(result.message || 'Great job! You executed the Git workflow accurately.')}</div>
      `;
      // Mark all task list items completed
      document.querySelectorAll('#lab-tasks-list li').forEach(li => {
        li.classList.add('task-completed');
      });
      // Show next lesson button if not on last lesson
      if (labState.currentLessonIndex < LAB_LESSONS.length - 1) {
        elements.btnNextLesson.classList.remove('hidden');
      }
    } else {
      elements.labFeedbackBox.className = 'lab-feedback-box error';
      elements.labFeedbackBox.innerHTML = `
        <div style="font-weight:700; margin-bottom: 0.35rem;">CHECK INCOMPLETE</div>
        <div>${escapeHtml(result.error || 'Please review the tasks and try again.')}</div>
      `;
    }
  });

  // Reset Sandbox
  elements.btnResetSandbox.addEventListener('click', () => {
    if (confirm('Reset the current lab environment? All uncommitted and local changes will be restored.')) {
      loadLabLesson(labState.currentLessonIndex);
      printTerminalSystemMessage('[Environment reset to lesson starting state]');
    }
  });

  // Next Lesson
  elements.btnNextLesson.addEventListener('click', () => {
    if (labState.currentLessonIndex < LAB_LESSONS.length - 1) {
      const nextIdx = labState.currentLessonIndex + 1;
      elements.selectLabLesson.value = nextIdx;
      loadLabLesson(nextIdx);
    }
  });

  // Load initial lesson 0
  loadLabLesson(0);
}

function loadLabLesson(index) {
  const lesson = LAB_LESSONS[index];
  if (!lesson) return;

  labState.currentLessonIndex = index;
  labState.revealedHints = 0;
  labState.solutionVisible = false;

  // Reset hints UI
  elements.labHintBox.classList.add('hidden');
  elements.labHintBox.innerHTML = '';
  elements.btnLabHint.innerHTML = `Need Hint (<span id="lab-hint-count">0/${lesson.hints ? lesson.hints.length : 0}</span>)`;
  elements.labHintCount = document.getElementById('lab-hint-count');

  // Reset solution UI
  elements.labSolutionBox.classList.add('hidden');
  elements.btnLabSolution.textContent = 'Show Solution';
  const codeEl = elements.labSolutionCode.querySelector('code');
  if (codeEl) codeEl.textContent = lesson.solution || '';

  // Reset feedback & next button
  elements.labFeedbackBox.classList.add('hidden');
  elements.labFeedbackBox.innerHTML = '';
  elements.btnNextLesson.classList.add('hidden');

  // Populate lesson header & tasks
  elements.labLessonCat.textContent = lesson.category;
  elements.labLessonTitle.textContent = lesson.title;
  elements.labLessonDesc.textContent = lesson.description;

  elements.labTasksList.innerHTML = lesson.tasks.map(t => `
    <li id="task-item-${t.id}">
      <span class="task-num">${t.id}</span>
      <span class="task-text">${formatTaskText(t.text)}</span>
    </li>
  `).join('');

  // Setup terminal state from scenario
  if (lesson.scenario) {
    if (lesson.scenario.isRepo === false) {
      labState.terminal.reset();
      labState.terminal.git.isRepo = false;
      const dir = labState.terminal.getProjectDir();
      Object.entries(lesson.scenario.files || {}).forEach(([name, content]) => {
        dir[name] = { type: 'file', content };
      });
    } else {
      labState.terminal.seedRepo(lesson.scenario);
    }
  } else {
    labState.terminal.reset();
  }

  // Update prompt and title
  elements.terminalOutput.innerHTML = '';
  elements.terminalPrompt.textContent = labState.terminal.getPrompt();
  const branchPart = labState.terminal.git.isRepo ? ` (${labState.terminal.git.head})` : '';
  elements.terminalTitle.textContent = `bash — user@github-sandbox: ~/project${branchPart}`;

  printTerminalSystemMessage(`Loaded ${lesson.title}. Ready for commands.`);
}

function renderLabHints(lesson) {
  if (!lesson.hints || lesson.hints.length === 0) return;

  const shown = lesson.hints.slice(0, labState.revealedHints);
  elements.labHintBox.classList.remove('hidden');
  elements.labHintBox.innerHTML = shown.map(h => `<div class="hint-item">${formatTaskText(h)}</div>`).join('');
  
  elements.labHintCount = document.getElementById('lab-hint-count');
  if (elements.labHintCount) {
    elements.labHintCount.textContent = `${labState.revealedHints}/${lesson.hints.length}`;
  }

  if (labState.revealedHints >= lesson.hints.length) {
    elements.btnLabHint.innerHTML = `All Hints Shown (${lesson.hints.length}/${lesson.hints.length})`;
  } else {
    elements.btnLabHint.innerHTML = `Need Hint (<span id="lab-hint-count">${labState.revealedHints}/${lesson.hints.length}</span>)`;
    elements.labHintCount = document.getElementById('lab-hint-count');
  }
}

function printTerminalSystemMessage(msg) {
  const div = document.createElement('div');
  div.className = 'terminal-cmd-output';
  div.style.color = '#8b949e';
  div.style.fontStyle = 'italic';
  div.textContent = msg;
  elements.terminalOutput.appendChild(div);
  elements.terminalBody.scrollTop = elements.terminalBody.scrollHeight;
}

function executeTerminalCommand(cmdText) {
  if (!labState.terminal) return;
  const currentPrompt = labState.terminal.getPrompt();

  // Print command line
  const entry = document.createElement('div');
  entry.className = 'terminal-cmd-entry';
  entry.innerHTML = `<span class="prompt">${escapeHtml(currentPrompt)}</span><span class="cmd">${escapeHtml(cmdText)}</span>`;
  elements.terminalOutput.appendChild(entry);

  // Execute
  const result = labState.terminal.execute(cmdText);

  // Check for nano editor trigger
  if (result && result.nano) {
    if (elements.nanoEditorView && elements.terminalBody) {
      elements.nanoFilename.textContent = result.filename;
      elements.nanoTextarea.value = result.content || '';
      elements.nanoStatusMsg.textContent = `File: ${result.filename}  (Use Save & Exit or ^X)`;
      elements.nanoEditorView.classList.remove('hidden');
      elements.terminalBody.classList.add('hidden');
      elements.nanoTextarea.focus();
      return;
    }
  }

  if (result && result.clear) {
    elements.terminalOutput.innerHTML = '';
  } else if (result !== undefined && result !== '') {
    const out = document.createElement('div');
    out.className = 'terminal-cmd-output';
    out.innerHTML = formatAnsi(result);
    elements.terminalOutput.appendChild(out);
  }

  // Update prompt & title
  elements.terminalPrompt.textContent = labState.terminal.getPrompt();
  const branchPart = labState.terminal.git.isRepo ? ` (${labState.terminal.git.head})` : '';
  elements.terminalTitle.textContent = `bash — user@github-sandbox: ~/project${branchPart}`;

  // Scroll output to bottom (input row stays pinned)
  elements.terminalOutput.scrollTop = elements.terminalOutput.scrollHeight;
}

// Run app
document.addEventListener('DOMContentLoaded', init);



// Wire up Web App Footer Buttons
function setupFooterListeners() {
  const bindClick = (id, callback) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', (e) => {
      e.preventDefault();
      callback();
    });
  };

  // Practice Modes
  bindClick('footer-btn-full', () => {
    showScreen('screen-dashboard');
    const btn = document.getElementById('mode-exam');
    if (btn) btn.scrollIntoView({ behavior: 'smooth' });
  });

  bindClick('footer-btn-ms', () => {
    showScreen('screen-dashboard');
    const btn = document.getElementById('mode-practice');
    if (btn) btn.scrollIntoView({ behavior: 'smooth' });
  });

  bindClick('footer-btn-sprint', () => {
    showScreen('screen-dashboard');
    const btn = document.getElementById('mode-sprint');
    if (btn) btn.scrollIntoView({ behavior: 'smooth' });
  });

  bindClick('footer-btn-tf', () => {
    showScreen('screen-dashboard');
    const btn = document.getElementById('mode-tf');
    if (btn) btn.scrollIntoView({ behavior: 'smooth' });
  });

  bindClick('footer-btn-custom', () => {
    showScreen('screen-dashboard');
    const picker = document.getElementById('domain-picker-card');
    if (picker) picker.scrollIntoView({ behavior: 'smooth' });
  });

  // Study Hub Subtabs
  bindClick('footer-btn-theory', () => {
    showScreen('screen-study');
    const subtab = document.querySelector('[data-subtab="theory"]');
    if (subtab) subtab.click();
  });

  bindClick('footer-btn-git-cli', () => {
    showScreen('screen-study');
    const subtab = document.querySelector('[data-subtab="git-commands"]');
    if (subtab) subtab.click();
  });

  bindClick('footer-btn-gh-cli', () => {
    showScreen('screen-study');
    const subtab = document.querySelector('[data-subtab="gh-cli"]');
    if (subtab) subtab.click();
  });

  bindClick('footer-btn-arch', () => {
    showScreen('screen-study');
    const subtab = document.querySelector('[data-subtab="architecture"]');
    if (subtab) subtab.click();
  });

  bindClick('footer-btn-repo-files', () => {
    showScreen('screen-study');
    const subtab = document.querySelector('[data-subtab="repo-files"]');
    if (subtab) subtab.click();
  });

  // Terminal Lab Lessons
  [0, 1, 2, 3, 4].forEach(idx => {
    bindClick('footer-btn-lab-' + idx, () => {
      showScreen('screen-lab');
      if (elements.selectLabLesson) {
        elements.selectLabLesson.value = idx;
        loadLabLesson(idx);
      }
    });
  });
}
