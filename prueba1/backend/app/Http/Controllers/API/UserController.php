<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\APIUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class UserController extends Controller
{
    public function index()
    {
        if (APIUser::exists()) {
            $users = APIUser::first();
            return response($users->data);
        }
        $users = Http::get('https://randomuser.me/api/?results=30');
        if ($users) {
            APIUser::create(['data' => $users]);
        }
        return response($users);
    }
    public function filter(Request $request)
    {
        $users = json_decode(APIUser::first()->data)->results;
        $filteredArray = [];
        if (!empty($request->name)) {
            foreach ($users as $user) {
                $name = $user->name->first . " " . $user->name->last;
                if (str_contains($name, $request->name)) {
                    $filteredArray[] = $user;
                }
            }
        }
        if (!empty($request->male)) {
            if (!empty($filteredArray)) {
                foreach ($filteredArray as $key => $user) {
                    if ($user->gender !== 'male') {
                        unset($filteredArray[$key]);
                    }
                }
            } else {
                foreach ($users as $user) {
                    if ($user->gender === 'male') {
                        $filteredArray[] = $user;
                    }
                }
            }
        }
        if (!empty($request->female)) {
            if (!empty($filteredArray)) {
                foreach ($filteredArray as $key => $user) {
                    if ($user->gender !== 'female') {
                        unset($filteredArray[$key]);
                    }
                }
            } else {
                foreach ($users as $user) {
                    if ($user->gender === 'female') {
                        $filteredArray[] = $user;
                    }
                }
            }
        }

        if (!empty($request->nationality)) {
            if (!empty($filteredArray)) {
                foreach ($filteredArray as $key => $user) {
                    if ($user->location->country !== $request->nationality) {
                        unset($filteredArray[$key]);
                    }
                }
            } else {
                foreach ($users as $user) {
                    if ($user->location->country === $request->nationality) {
                        $filteredArray[] = $user;
                    }
                }
            }
        }
        if (!empty($request->age)) {
            if (!empty($filteredArray)) {
                foreach ($filteredArray as $key => $user) {
                    if ($user->dob->age > $request->age) {
                        unset($filteredArray[$key]);
                    }
                }
            } else {
                foreach ($users as $user) {
                    if ($user->dob->age >= $request->age) {
                        $filteredArray[] = $user;
                    }
                }
            }
        }

        if (empty($filteredArray)) {
            $filteredArray = $users;
        }
        return response(['results' => $filteredArray]);
    }
    public function show($id)
    {
        $users = json_decode(APIUser::first()->data)->results;
        $selectedUser = [];
        foreach ($users as $user ) {
            if ($user->login->uuid === $id){
                $selectedUser = $user;
                break;
            }
        }
        return response(['results' => $selectedUser]);
    }
    public function delete($id)
    {
        $users = json_decode(APIUser::first()->data)->results;
        $selectedUser = [];
        foreach ($users as $user ) {
            if ($user->login->uuid !== $id){
                $selectedUser[] = $user;
            }
        }
        APIUser::first()->update(['data' => json_encode(['results' => $selectedUser]) ]);
        return response(['results' => $selectedUser]);

    }
}
