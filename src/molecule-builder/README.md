# Molecule Builder

## Step 1 — Reference coordinate workflow

Источник истины для новой молекулы:

1. Реальное изображение молекулы (reference PNG)
2. Координатная сетка
3. Карта опорных точек атомов
4. 3D-определение атомов и связей

Структура:

```
reference.png
      |
      v
coordinate grid
      |
      v
moleculeDefinition.js
      |
      v
MoleculeBuilder
      |
      v
Three.js scene
```

На этом этапе создаётся только фундамент. Старая молекула не используется как источник координат.
