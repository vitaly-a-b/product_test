<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Category;
use App\Models\Product;

class ProductStoreTest extends TestCase
{
    use RefreshDatabase;

    // Не авторизованный не может создать товар
    public function test_guest_cannot_create_product(): void
    {
        $category = Category::factory()->create();

        $response = $this->postJson('/api/products', [
            'name' => 'Test Product',
            'price' => 100,
            'category_id' => $category->id,
        ]);

        $response->assertStatus(401);
    }



    // Валидация не пропускает некорректные данные
    public function test_validation_fails_with_invalid_data(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();

        $payload = [
            'name' => '',
            'price' => -10,
            'category_id' => 999,
        ];

        $response = $this
            ->actingAs($user, 'sanctum')
            ->postJson('/api/products', $payload);

        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'name',
                'price',
                'category_id',
            ]);
    }



    //Авторизованный пользователь может создать товар
    public function test_authenticated_user_can_create_product(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();

        $payload = [
            'name' => 'iPhone 15',
            'price' => 999.99,
            'category_id' => $category->id,
            'description' => 'New smartphone',
        ];

        $response = $this
            ->actingAs($user, 'sanctum')
            ->postJson('/api/products', $payload);

        $response
            ->assertStatus(201)
            ->assertJsonPath('name', 'iPhone 15')
            ->assertJsonPath('category.id', $category->id);

        $this->assertDatabaseHas('products', [
            'name' => 'iPhone 15',
            'price' => 999.99,
            'category_id' => $category->id,
        ]);
    }


}









