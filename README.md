[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jorgetolentinog_market&metric=alert_status)](https://sonarcloud.io/dashboard?id=jorgetolentinog_market)

# Ejemplo Serverless & Typescript

### Instalación:

Instalar dependencias de desarrollo.
```
npm ci
```

### Ejecutar base de datos

Ejecuta mongodb con docker
```
make mongo
```

### Ejecutar proyecto

Ejecuta proyecto para desarrollo
```
npm start
```

### Ejecutar pruebas

Ejecuta pruebas y cobertura del proyecto
```
npm t
```

---

### Compilar con webpack
```
npm run serverless -- webpack
```

### Desplegar
```
npm run deploy
```

---

### Compilar swagger docs

Recopila comentarios y los guarda en `docs/swagger.json`.
```
npm run docs:swagger
```
