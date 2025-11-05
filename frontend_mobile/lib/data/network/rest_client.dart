import 'package:retrofit/retrofit.dart';
import 'package:dio/dio.dart';
import '../models/post.dart';

part 'rest_client.g.dart';

@RestApi(baseUrl: "http://127.0.0.1:5000/api/")
abstract class RestClient {
  factory RestClient(Dio dio, {String? baseUrl}) = _RestClient;

  // READ
  @GET("/posts")
  Future<List<Post>> getPosts();

  @GET("/posts/{id}")
  Future<Post> getPostById(@Path("id") String id);

  // CREATE
  @POST("/posts")
  Future<Post> createPost(@Body() Map<String, dynamic> body);
  // body: { "title": "...", "content": "..." }

  // UPDATE
  @PUT("/posts/{id}")
  Future<Post> updatePost(
    @Path("id") String id,
    @Body() Map<String, dynamic> body,
  );

  // DELETE
  @DELETE("/posts/{id}")
  Future<void> deletePost(@Path("id") String id);
}
