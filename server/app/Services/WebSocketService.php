<?php

namespace App\Services;

use Ratchet\ConnectionInterface;

class WebSocketService
{
    private static array $connections = [];

    public static function addConnection(int $restaurantId, ConnectionInterface $conn): void
    {
        if (!isset(self::$connections[$restaurantId])) {
            self::$connections[$restaurantId] = [];
        }
        self::$connections[$restaurantId][$conn->resourceId] = $conn;
    }

    public static function removeConnection(ConnectionInterface $conn): void
    {
        foreach (self::$connections as $restaurantId => $connections) {
            if (isset($connections[$conn->resourceId])) {
                unset(self::$connections[$restaurantId][$conn->resourceId]);
                break;
            }
        }
    }

    public static function broadcast(int $restaurantId, string $event, array $data): void
    {
        $message = json_encode([
            'event' => $event,
            'data' => $data,
        ]);

        $filePath = storage_path('app/websocket_messages.json');
        $messages = [];
        
        if (file_exists($filePath)) {
            $content = file_get_contents($filePath);
            $messages = json_decode($content, true) ?? [];
        }

        $messages[] = [
            'restaurant_id' => $restaurantId,
            'message' => $message,
            'timestamp' => now()->timestamp,
        ];

        $messages = array_filter($messages, fn($m) => $m['timestamp'] > now()->subMinutes(5)->timestamp);

        file_put_contents($filePath, json_encode(array_values($messages)));
    }

    public static function getMessages(int $restaurantId, int $since): array
    {
        $filePath = storage_path('app/websocket_messages.json');
        
        if (!file_exists($filePath)) {
            return [];
        }

        $content = file_get_contents($filePath);
        $messages = json_decode($content, true) ?? [];

        return array_values(array_filter($messages, fn($m) => 
            $m['restaurant_id'] == $restaurantId && $m['timestamp'] > $since
        ));
    }
}
