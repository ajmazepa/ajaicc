![](https://raw.githubusercontent.com/ajmazepa/ajaicc/main/img/ajaicc_banner.jpg)

# ajaicc
A simple JavaScript library to handle AICC LMS communication. It has been tested with SCORM Cloud and Cornerstone OnDemand Learning. If you test it in another LMS let me know how it goes!

## Installation
Include src/ajaicc.min.js in your project

## Usage
`ajaicc.foundLMSParams()` returns boolean value determined by whether the necessary AICC_URL and AICC_SID querystring parameters were found.

`ajaicc.aiccGet(callback)` passes an object with the AICC GET response from the LMS to the specififed callback function:

    {
      error: 0
      error_text: Successful
      version: 3.5
      aicc_data: [core]
      student_id=ajmazepa@gmail.com
      student_name=Mazepa, AJ
      credit=no-credit
      lesson_location=
      lesson_mode=normal
      lesson_status=c
      score=46.000000000
      time=0001:57:32
      [core_lesson]
      [core_vendor]
      A.J. Mazepa
      [objectives_status]
      [student_data]
      mastery_score: 100.000000000
      max_time_allowed: 9999:00:00
      time_limit_action: 
    }

`ajaicc.aiccPut(location, credit, score, time, status, exit, callback)` receives the PUT parameters and passes an object with the AICC PUT response from the LMS to the specififed callback function:

    {
      GET error: 0
      error_text: Successful
      version: 
      aicc_data: 
    }
    
`ajaicc.aiccExit(callback)` passes an object with the AICC EXIT response from the LMS to the specififed callback function:

    {
      GET error: 0
      error_text: Successful
      version: 
      aicc_data: 
    }

## Examples
`test_view_output.zip` Basic HTML template which demonstrates the GET, PUT, and EXIT AICC commands and displays the output. Needs to be loaded into an LMS or SCORM Cloud.

## Examples
`test_auto_complete_pdf.zip` A basic HTML template which records a completion and displays a PDF document. Needs to be loaded into an LMS or SCORM Cloud.
