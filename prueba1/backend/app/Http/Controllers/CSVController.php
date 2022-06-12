<?php

namespace App\Http\Controllers;

use App\Models\APIUser;
use Illuminate\Http\Request;

class CSVController extends Controller
{
    public function export(Request $request)
    {
        $users = json_decode(APIUser::first()->data)->results;
        $ids = explode(',',$request->ids);
        $selectedUsers = [];
        foreach ($ids as $id ) {
            foreach ($users as $user) {
                if ($id === $user->login->uuid ) {
                    $selectedUsers[] = $user;
                }
            }
        }

        $headers = array(
            "Content-type" => "text/csv",
            "Content-Disposition" => "attachment; filename=file.csv",
            "Pragma" => "no-cache",
            "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
            "Expires" => "0"
        );
    
        $columns = array('Name', 'Email');
    
        $callback = function() use ($selectedUsers, $columns)
        {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);
            foreach ($selectedUsers as $user) {
                fputcsv($file, array($user->name->first.' '.$user->name->first, $user->email));
            }
            fclose($file);
        };
        return \Response::stream($callback, 200, $headers);
    }
}
