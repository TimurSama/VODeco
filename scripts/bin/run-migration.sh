#!/bin/bash
echo "Запуск миграций для VODeco..."
npx tsx scripts/migration.ts
echo "Миграция завершена!"