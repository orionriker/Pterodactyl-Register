# 📦 Pterodactyl Register
Pterodactyl Register Module, unlike some other modules this module's register page is made with reactjs

## ⚙️ Configuration

### 📄 File Placement
Copy/Paste __RegisterController.php__ to __YOUR PTERODACTYL FOLDER /app/Http/Controllers/__<br>
Copy/Paste __RegisterContainer.tsx__ to __YOUR PTERODACTYL FOLDER /resources/scripts/components/auth__

### 🔑 Api key
You need to make a apikey in the admin panel with the read/write perms on "Users"
and then copy the key and replace it in the `RegisterController.php` where it says *YOURAPIKEYHERE* on line __75__

### 🔗 Routes
Add these to lines at `/routes`:
**if you are on version __1.7.9__:**<br>
**if you are on version __1.8.x__:**<br>
```php
Route::get('/register', [Auth\RegisterController::class, 'index'])->name('auth.register');
```

```php
Route::post('/register', [Auth\RegisterController::class, 'register'])->name('auth.register.url')->middleware('recaptcha');
```

# 🎟️ Support
This Module supports pterodactyl __1.7.9__ and __1.8.x__
for older versions i have not tested but you can do that and if you encounter problems
open an issue and i'll try to solve it :D

# 📄 Lisence
This Pterodactyl Module is Lisenced under: **GNU General Public Lisence 3.0**
