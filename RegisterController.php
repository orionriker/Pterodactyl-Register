<?php

namespace Pterodactyl\Http\Controllers\auth;

use Pterodactyl\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Auth\AuthManager;
use Illuminate\Container\Container;
use Illuminate\Contracts\View\View;
use Illuminate\Contracts\View\Factory as ViewFactory;

class RegisterController extends Controller
{   
    /**
     * @var Illuminate\Contracts\View\Factory
     */
    private ViewFactory $view;

    /**
     * @var Illuminate\Auth\AuthManager
     */
	protected AuthManager $auth;

    /**
     * RegisterController constructor.
     */
    public function __construct(ViewFactory $view) {
        $this->auth = Container::getInstance()->make(AuthManager::class);
        $this->view = $view;
    }

    /**
     * Handle all incoming requests for the authentication routes and render the
     * base authentication view component. Vuejs will take over at this point and
     * turn the register area into a SPA.
     */
    public function index(): View
    {
        return $this->view->make('templates/auth.core');
    }

    /**
     * Handle a register request to the application.
     * returns a JSON Response or throws Validation Rrror, cURL Error or API Error
     */
	public function register(Request $req)
	{
        /**
         *  Validate form data Again for extra security
         *  since reactjs in client side the client can change the code on his side and bypass validation
         */
		$valid = $req->validate([
			'email' => 'required|email|regex:/(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)+/|min:3|max:35',
			'username' => 'required|regex:/(^[A-Za-z0-9 ]+$)+/|min:3|max:24',
			'firstname' => 'required|regex:/(^[A-Za-z0-9 ]+$)+/|min:3|max:15',
			'lastname' => 'required|regex:/(^[A-Za-z0-9 ]+$)+/|min:3|max:15'
		]);

        /**
         *  Send POST request with form data to api via cURL
         *  And also replace text in the curlopt headers YOURAPIKEYHERE to your apikey
         */
        $curl = curl_init();
        curl_setopt_array($curl, array(
          CURLOPT_URL => "https://YOURWEBSITEURL/api/application/users",
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => "",
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 30,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => "POST",
          CURLOPT_HTTPHEADER => array(
            "Accept: application/json",
            "Content-Type: application/json",
            "Authorization: Bearer YOURAPIKEYHERE"
          ),
          CURLOPT_POSTFIELDS => "{\"email\": \"".$req->input('email')."\", \"username\": \"".$req->input('username')."\", \"first_name\": \"".$req->input('firstname')."\", \"last_name\": \"".$req->input('lastname')."\"}",
        ));
        $res = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);
        
        $jsn = json_decode($res, true);
        
        if ($err) {
            /**
             *  Handle cURL error
             */
            printf($err);
            http_response_code(422);
            exit;
        } elseif(!empty($jsn['errors'])) {
            /**
             *  Handle API error
             */
            printf($res);
            http_response_code(422);
            exit;
        } else {
            /**
             *  Handle Success
             */
            printf('You have been successfully registered please check your email to setup your account.');
            http_response_code(200);
            exit;
        }
	}
}