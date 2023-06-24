# 📦 Pterodactyl Register
Pterodactyl Register Module, this is usefull if you want to have a registration page in your pterodactyl panel for your clients to register

# ⚙️ Configuration

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

# 🎟️ Support
This module is compatible with Pterodactyl version 1.7.x. Although I haven't tested it on older versions, you can give it a try. If you encounter any issues or need assistance, please open an issue, and I'll do my best to help you.

# 📄 Lisence
This Pterodactyl Module is licensed under the **GNU General Public Lisence 3.0**
