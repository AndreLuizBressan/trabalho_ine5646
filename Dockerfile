FROM python:3.11.3-alpine3.18

ENV PYTHONDONTWRITEBYTECODE 1

ENV PYTHONUNBUFFERED 1

COPY backend /backend
COPY scripts /scripts

WORKDIR /backend

EXPOSE 8000
EXPOSE 5432

RUN python -m venv /venv && \
  /venv/bin/pip install --upgrade pip && \
  /venv/bin/pip install -r /backend/requirements.txt && \
  chmod -R +x /scripts

ENV PATH="/scripts:/venv/bin:$PATH"

ENTRYPOINT ["commands.sh"]