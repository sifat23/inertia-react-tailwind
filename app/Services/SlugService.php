<?php

namespace App\Services;

use Illuminate\Support\Str;

final class SlugService
{
    public static function generate($model, string $title): string
    {
        $slug = Str::slug($title);

        // Check if slug already exists in DB
        $count = $model::where('slug', 'LIKE', "{$slug}%")->count();

        // If exists, append number
        return $count ? "{$slug}-{$count}" : $slug;
    }
}
