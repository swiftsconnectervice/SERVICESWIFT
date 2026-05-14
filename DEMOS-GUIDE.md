# Guía de Demos

## Estructura de carpetas

Cada demo vive en `public/demos/` con su propia carpeta nombrada por cliente:

```
public/
└── demos/
    ├── dentista/
    │   └── index.html
    ├── abogado/
    │   └── index.html
    └── restaurante/
        └── index.html
```

**Convención de nombres:** usa kebab-case en minúsculas, sin espacios ni acentos.

| Cliente | Carpeta | URL pública |
|---|---|---|
| Dr. José Antonio Con | `dentista` | `/demos/dentista/` |
| Despacho jurídico | `abogado` | `/demos/abogado/` |
| Restaurante XYZ | `restaurante` | `/demos/restaurante/` |

---

## Flujo para agregar o modificar un demo

### 1. Crear un demo nuevo

Copia el HTML base y renómbralo a `index.html` dentro de su carpeta:

```
public/demos/nombre-cliente/index.html
```

### 2. Publicar cambios

Desde la carpeta `web-architects/` ejecuta:

```bash
git add public/demos/
git commit -m "feat: add demo nombre-cliente"
git push origin main
```

### 3. Verificar

Vercel despliega automáticamente. La URL queda en:

```
https://serviceswiftsite.vercel.app/demos/nombre-cliente/
```

---

## Flujo para modificar un demo existente

```bash
git add public/demos/nombre-cliente/index.html
git commit -m "fix: update copy demo nombre-cliente"
git push origin main
```
