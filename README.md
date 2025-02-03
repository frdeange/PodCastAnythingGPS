# Podcast Anything GPS

## Description

Podcast Anything GPS is a powerful web application designed to transform extracted text into dual-voiced podcast scripts and audio files. This versatile application allows users to upload documents or provide links to web content for text extraction. Leveraging generative AI models, it creates engaging two-voice podcast scripts. Users can select from different languages and voice tones for the final audio file, narrating the extracted content.

The application provides maximum flexibility by allowing users to customize both the extracted text and the AI-generated script, making it ideal for content creators, educators, and businesses looking to repurpose textual information into compelling audio formats.

## Features

- **Text Extraction:** Supports uploading documents (PDF, DOCX) or entering URLs for web content extraction.
- **Document Analysis:** Utilizes Azure Form Recognizer to analyze and extract structured data from documents.
- **Voice Synthesis:** Converts text into speech using Azure Speech Services, supporting multiple languages and voice tones.
- **OpenAI Integration:** Employs OpenAI models for advanced text processing, including script generation and summarization.
- **Script Customization:** Users can edit both the extracted text and the AI-generated podcast script for personalized content.
- **Multi-Page Navigation:** Intuitive interface with distinct pages for text extraction, script generation, and audio playback.

## Technologies Used

- **Backend:** Python, Flask
- **Frontend:** HTML, CSS (Bootstrap), JavaScript
- **Cloud Services:** Azure Cognitive Services (Form Recognizer, Speech Services), Azure Blob Storage
- **AI Models:** OpenAI API
- **Libraries:** BeautifulSoup (for web scraping), PyPDF2 (for PDF text extraction)

## Installation and Setup

### Prerequisites

- Python 3.8+
- Docker (for DevContainer setup)
- Visual Studio Code (optional, for container development)
- **FFmpeg:** Required for audio processing. See the FFmpeg Installation section below.

### Clone the Repository

```bash
git clone <repository-url>
cd podcast-anything-gps
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Configure Environment Variables

Set up the environment variables as specified in the `fakenv.env` file. Ensure to include API keys and endpoints for:

- Azure Cognitive Services
- OpenAI API
- Azure Blob Storage (if applicable)

### FFmpeg Installation

The application relies on **FFmpeg** for audio processing. If you're running the application locally without a DevContainer, you'll need to install FFmpeg manually.

#### For Windows:

1. **Download FFmpeg:**
   - Visit the [official FFmpeg download page](https://ffmpeg.org/download.html).
   - Choose a Windows build provider and download the release version.

2. **Extract and Configure:**
   - Extract the downloaded ZIP file.
   - Add the `bin` folder to your system PATH.

3. **Verify Installation:**
   ```bash
   ffmpeg -version
   ```

#### For macOS:

```bash
brew install ffmpeg
```

Verify installation:

```bash
ffmpeg -version
```

#### For Linux:

- **Debian/Ubuntu:**
  ```bash
  sudo apt update
  sudo apt install ffmpeg
  ```
- **Fedora:**
  ```bash
  sudo dnf install ffmpeg
  ```
- **Arch Linux:**
  ```bash
  sudo pacman -S ffmpeg
  ```

Verify installation:

```bash
ffmpeg -version
```

## DevContainer Setup

This repository includes a **DevContainer** configuration, making it easy to set up a consistent development environment.

### How to Use the DevContainer:

1. Ensure Docker is installed and running.
2. Install the 'Remote - Containers' extension in Visual Studio Code.
3. Open the project folder in VS Code.
4. Run the command:
   ```bash
   Remote-Containers: Reopen in Container
   ```
5. The DevContainer will automatically build the environment and start the application.

**Important:**

- You must be authenticated as described in the **Authentication** section for the application to function correctly.
- The DevContainer automatically installs all dependencies, including FFmpeg.

## Authentication

The application utilizes Azure's `DefaultAzureCredential` for authentication. This mechanism streamlines the process by automatically selecting the most appropriate authentication method based on the application's environment. Depending on where and how the application is running, `DefaultAzureCredential` attempts to authenticate using various methods in a predefined order.

### Authentication Methods

1. **Environment Variables:** If specific environment variables are set (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, and `AZURE_CLIENT_SECRET`), the application will use these credentials to authenticate.
2. **Managed Identity:** When deployed to Azure services that support Managed Identity, the application can authenticate using the managed identity assigned to the service.
3. **Development Tools:** During local development, the application can authenticate using credentials from developer tools:
   - **Azure CLI:** If you're signed in via the Azure CLI (`az login`), the application will use these credentials.
   - **Visual Studio Code:** If you're signed in with the Azure Account extension in VS Code, those credentials will be used.
   - **Azure PowerShell:** Credentials from `Connect-AzAccount` can also be utilized.

### Setting Up Authentication for Local Development

1. **Azure CLI:**
   ```bash
   az login
   ```

2. **Visual Studio Code:**
   - Install the Azure Account extension and sign in.

3. **Environment Variables:**
   - Set `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, and `AZURE_CLIENT_SECRET` as environment variables.

### Authentication in Production

When deploying the application to Azure, it's recommended to use Managed Identity for authentication:

1. Enable Managed Identity in your Azure resource.
2. Assign necessary Azure roles to the managed identity.

For more details, refer to the [Azure documentation](https://learn.microsoft.com/en-us/python/api/azure-identity/azure.identity.defaultazurecredential?view=azure-python).

## Usage

### Running the Application

```bash
python app.py
```

### Access the Application

Visit:

```
http://localhost:5000
```

Here you can:

- Upload documents or input URLs for text extraction.
- Customize the extracted text.
- Generate podcast scripts with dual voices.
- Produce and download the corresponding audio files.
- Listen to the generated audio directly within the application.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
