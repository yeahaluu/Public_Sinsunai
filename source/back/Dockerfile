FROM python:3.8

ARG PROJECT_DIR="/testapp"
COPY . ${PROJECT_DIR}
WORKDIR ${PROJECT_DIR}
RUN pip install --upgrade pip && pip install -r requirements.txt

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
