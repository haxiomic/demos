#!/bin/bash
sass --watch scss:css &
autoreload-server -f --port 8080 &
open http://localhost:8080