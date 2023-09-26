# Pterodactyl Register

<div align="center">
  <img alt="GitHub Stars" src="https://img.shields.io/github/stars/gamemaster123356/Pterodactyl-Register?color=dodgerblue&label=stars&style=for-the-badge">
  <img alt="GitHub Issues" src="https://img.shields.io/github/issues/gamemaster123356/Pterodactyl-Register?color=dodgerblue&label=issues&style=for-the-badge">
  <img alt="GitHub License" src="https://img.shields.io/badge/LICENSE-gnu%20gpl%20v3-dodgerblue?style=for-the-badge">
</div><br><br>

The Pterodactyl Register Module is a valuable addition to your Pterodactyl panel, enabling you to incorporate a user registration page specifically designed for your clients. This module not only allows your clients to register easily but also maintains the cohesive Pterodactyl theme, ensuring a seamless user experience throughout the panel.<br>

By integrating the Pterodactyl Register Module, you can provide a streamlined and intuitive registration process, enabling new users to quickly sign up and access your services. Whether you are managing a game server, hosting platform, or any other service powered by Pterodactyl, this module enhances the functionality of your panel by adding a user-friendly registration page.<br>

Not only does the module offer a seamless user registration experience, but it also seamlessly integrates with the existing Pterodactyl login theme. This ensures consistency in the visual appearance and branding of your panel, creating a cohesive and professional interface for your clients<br>

With the Pterodactyl Register Module, you can effortlessly enhance your Pterodactyl panel by providing a dedicated registration page that aligns with the familiar Pterodactyl design, ultimately improving user engagement and satisfaction.
<br>
<br>

## ⚙️ Installation

### 📄 File Placement
Copy/Paste __RegisterController.php__ to __YOUR PTERODACTYL FOLDER /app/Http/Controllers/__<br>
Copy/Paste __RegisterContainer.tsx__ to __YOUR PTERODACTYL FOLDER /resources/scripts/components/auth__

### 🔑 Api key
You need to make a apikey in the admin panel with the read/write perms on "Users"
and then copy the key and replace it in the `RegisterController.php` where it says *YOURAPIKEYHERE* on line __75__
also don't forget to replace *YOURWEBSITEURL* to your website url on line __65__

### 🔗 Routes
<br>

> **if you are on version __1.7.0__:**<br>

Add the following lines to `YOUR PTERODACTYL FOLDER/routes/auth.php`:
```php
Route::get('/register', [RegisterController::class, 'index'])->name('auth.register');
```
Place the below route under the `Route::middleware(['throttle:authentication'])`
```php
Route::post('/register', [RegisterController::class, 'register'])->name('auth.register.url')->middleware('recaptcha');
```

<br>

> **if you are on version __1.8.x__:**<br>

Add the following lines to `YOUR PTERODACTYL FOLDER/routes/auth.php`:
```php
Route::get('/register', [Auth\RegisterController::class, 'index'])->name('auth.register');
```
Place the below route under the `Route::middleware(['throttle:authentication'])`
```php
Route::post('/register', [Auth\RegisterController::class, 'register'])->name('auth.register.url')->middleware('recaptcha');
```

<br>

Additionally, regardless of the version of Pterodactyl you are using, add the following line to `YOUR PTERODACTYL FOLDER/resources/scripts/routers/AuthenticationRouter.tsx`:
```php
<Route path={`${path}/register`} component={RegisterContainer} exact/>
```

<br>

## 🎟️ Support
This module is compatible with Pterodactyl version 1.7.x. Although I haven't tested it on older versions, you can give it a try. If you encounter any issues or need assistance, please open an issue, and I'll do my best to help you.<br><br>

## 📄 License
This Pterodactyl Module is licensed under the **GNU General Public Lisence 3.0**
