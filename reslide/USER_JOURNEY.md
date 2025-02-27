# ReSlide User Journey

## Overview
ReSlide is an AI-powered application that helps innovation consultants quickly create research-backed slides for presentations. The application leverages the Perplexity Sonar API to conduct research on specified topics and generates professional slides based on that research.

## User Personas
- **Primary**: Innovation consultants at banks who need to create research slides quickly
- **Secondary**: Other professionals who regularly create research-based presentations

## User Journey Phases

### 1. Authentication
**User Goals:**
- Access the application securely
- Maintain a history of previous research and slides

**Features:**
- Login with email/password
- Optional: SSO integration
- Account creation for new users
- Password recovery

**Success Criteria:**
- User can securely access their account
- User session is maintained appropriately

### 2. Research Setup
**User Goals:**
- Define the research topic clearly
- Provide context for the presentation
- Optionally provide slide templates that match their company's style

**Features:**
- Topic input field with suggestions
- Context form (audience, purpose, key points to include)
- Template uploader with preview
- Template analysis to extract style and structure

**Success Criteria:**
- System correctly understands the research topic
- System captures relevant context for tailoring the research
- System accurately processes uploaded templates

### 3. AI Research & Generation
**User Goals:**
- Obtain comprehensive research on the topic
- Have the research synthesized into a coherent narrative
- Get a professionally designed slide based on the research

**Features:**
- Progress indicator for research process
- Preview of key findings as they're discovered
- AI-powered slide generation based on research and templates
- Source citation management

**Success Criteria:**
- Research is accurate and relevant to the topic
- Slide content is well-organized and professional
- Sources are properly cited
- Generated slide matches provided templates (if applicable)

### 4. Review & Export
**User Goals:**
- Review the generated slide
- Make adjustments if necessary
- Export the slide in a usable format

**Features:**
- Interactive slide preview
- Edit capabilities for text and layout
- Regeneration option for unsatisfactory results
- Export to PowerPoint, PDF, or image formats

**Success Criteria:**
- User is satisfied with the generated slide
- Slide can be easily exported in the desired format
- Exported slide maintains all formatting and content

## Key Performance Indicators
- Time saved compared to manual research and slide creation
- User satisfaction with generated slides
- Accuracy of research
- Number of regeneration requests (lower is better)
- Export completion rate

## Future Enhancements
- Multi-slide presentation generation
- Integration with PowerPoint/Google Slides
- Collaborative features for team review
- Custom template creation and saving
- Research history and favorite sources 