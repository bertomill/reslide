# ReSlide File Structure

## Core Structure

reslide/
├── src/
│ ├── components/
│ │ ├── Auth/
│ │ │ └── Login.jsx
│ │ ├── Research/
│ │ │ ├── TopicForm.jsx
│ │ │ └── TemplateUpload.jsx
│ │ ├── Generation/
│ │ │ ├── ResearchProgress.jsx
│ │ │ └── SlidePreview.jsx
│ │ └── common/
│ │ ├── Header.jsx
│ │ └── Layout.jsx
│ ├── services/
│ │ ├── authService.js
│ │ ├── perplexityService.js
│ │ └── slideService.js
│ ├── pages/
│ │ ├── LoginPage.jsx
│ │ ├── ResearchPage.jsx
│ │ └── PreviewPage.jsx
│ ├── utils/
│ │ └── apiHelpers.js
│ ├── App.jsx
│ └── index.jsx
├── public/
│ ├── index.html
│ └── assets/
├── package.json
└── README.md