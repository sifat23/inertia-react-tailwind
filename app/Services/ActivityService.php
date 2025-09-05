<?php

namespace App\Services;

use App\Enums\ActivityAction;
use App\Models\AdminActivity;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

final class ActivityService
{
    public static function track(array $log, mixed $new_value = null, mixed $old_value = null): AdminActivity
    {
        return AdminActivity::query()->create([
            'admin_id' => Auth::guard('admin')->id(),
            'model' => $log['model'],
            'action' => $log['action'],
            'model_id' => !empty($new_value) ? $new_value->id : null,
            'old_value' => !empty($old_value) ? json_encode($old_value->toArray()) : null,
            'new_value' => !empty($new_value) ? json_encode($new_value->toArray()) : null,
        ]);
    }
}
